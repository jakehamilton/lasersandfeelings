const fs = require("fs");
const path = require("path");
const { createServer } = require("vite");
const { useKeyRef, useInstallEffect, once } = require("@leverage/core");
const { useHTTP } = require("@leverage/plugin-http");
const { useFastify } = require("@leverage/plugin-http/src/plugin");

const log = require("./lib/log");

const isProd = process.env.NODE_ENV !== "development";
const CLIENT_DIST =
	process.env.CLIENT_DIST ||
	path.resolve(__dirname, "..", "client/dist/client");

const init = () => {
	useHTTP();

	const viteRef = useKeyRef("vite");

	once("http:configured", async () => {
		const fastify = useFastify();

		if (!isProd) {
			viteRef.current = await createServer({
				configFile: path.resolve(__dirname, "../vite.config.ts"),
			});

			fastify.use(viteRef.current.middlewares);
		} else {
			fastify.use(require("compression")());
			fastify.use(
				require("serve-static")(CLIENT_DIST, {
					index: false,
				})
			);
		}

		const indexProd = isProd
			? fs.readFileSync(
					path.resolve(
						__dirname,
						"..",
						"client",
						"dist",
						"client",
						"index.html"
					),
					"utf8"
			  )
			: "";

		fastify.use(async (req, res, next) => {
			try {
				const url = req.originalUrl;

				// @NOTE(jakehamilton): API requests should not be proxied
				if (url.startsWith("/api")) {
					return next();
				}

				let template, render;
				if (!isProd) {
					template = fs.readFileSync(
						path.resolve(__dirname, "..", "client", "index.html"),
						"utf8"
					);
					template = await viteRef.current.transformIndexHtml(url, template);
					render = (
						await viteRef.current.ssrLoadModule(
							path.resolve(__dirname, "..", "client", "entry-server.tsx")
						)
					).render;
				} else {
					template = indexProd;
					render = require("../client/dist/server/entry-server.js").render;
				}

				log.info({
					scope: "http",
					path: url,
					method: req.method,
					message: "Performing SSR for request.",
				});

				const context = {};
				const appHtml = render(url, context);

				if (context.url) {
					log.info({
						scope: "http",
						path: url,
						method: req.method,
						message: "Redirecting",
						to: context.url,
					});
					res.writeHead(301, {
						Location: context.url,
					});
					res.end();
					return;
				}

				const html = template.replace(`<!--app-html-->`, appHtml);

				res.writeHead(200, {
					"Content-Type": "text/html",
				});
				res.end(html);
			} catch (error) {
				!isProd && viteRef.current.ssrFixStacktrace(error);

				log.error(error.message || error);
				for (const line of error.stack.split("\n").slice(1)) {
					log.error(line);
				}

				res.writeHead(500);
				res.end(error.stack);
			}
		});
	});
};

module.exports = {
	init,
};
