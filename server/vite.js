const fs = require("fs");
const path = require("path");
const { createServer } = require("vite");
const { useKeyRef, useInstallEffect, once } = require("@leverage/core");
const { useHTTP } = require("@leverage/plugin-http");
const { useFastify } = require("@leverage/plugin-http/src/plugin");

const isProd = process.env.NODE_ENV !== "development";

const init = () => {
	useHTTP();

	const viteRef = useKeyRef("vite");

	once("http:configured", async () => {
		const fastify = useFastify();

		if (!isProd) {
			viteRef.current = await createServer({
				root: path.resolve(__dirname, "..", "client"),
				logLevel: isProd ? "info" : "error",
				clearScreen: false,
				server: {
					middlewareMode: true,
				},
				plugins: [
					require("vite-plugin-windicss").default(),
					require("@preact/preset-vite").default(),
				],
			});

			fastify.use(viteRef.current.middlewares);
		} else {
			fastify.use(require("compression")());
			fastify.use(
				require("serve-static")(path.resolve(__dirname, "..", "dist/client"), {
					index: false,
				})
			);
		}

		const indexProd = isProd
			? fs.readFileSync(
					path.resolve(__dirname, "..", "client", "index.html"),
					"utf8"
			  )
			: "";

		fastify.use(async (req, res, next) => {
			try {
				const url = req.originalUrl;

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
					render = require("../dist/server/entry-server.js");
				}

				const context = {};
				const appHtml = render(url, context);

				if (context.url) {
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
				console.log(error.stack);
				res.writeHead(500);
				res.end(e.stack);
			}
		});
	});
};

module.exports = {
	init,
};
