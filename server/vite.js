const fs = require("fs");
const path = require("path");
const { createServer } = require("vite");
const { useKeyRef, useInstallEffect, once } = require("@leverage/core");
const { useHTTP } = require("@leverage/plugin-http");
const { useFastify } = require("@leverage/plugin-http/src/plugin");

const log = require("./lib/log");

const isProd = process.env.NODE_ENV !== "development";

const init = () => {
	useHTTP();

	const viteRef = useKeyRef("vite");

	once("http:configured", async () => {
		const fastify = useFastify();

		if (!isProd) {
			viteRef.current = await createServer({
				root: path.resolve(__dirname, "..", "client"),
				publicDir: path.resolve(__dirname, "..", "public"),
				logLevel: isProd ? "info" : "error",
				clearScreen: false,
				server: {
					middlewareMode: true,
				},
				plugins: [
					require("@preact/preset-vite").default(),
					require("vite-plugin-fonts").default({
						google: {
							display: "swap",
							families: ["Staatliches", "Inter"],
						},
					}),
					require("vite-plugin-windicss").default({
						root: path.resolve(__dirname, "..", "client"),
						scan: {
							include: [path.resolve(__dirname, "..", "client", "**/*.tsx")],
						},
						config: {
							darkMode: "class",
							theme: {
								extend: {
									fontFamily: {
										thick: "Staatliches",
										sans: "Inter",
									},
									lineClamp: {
										sm: "2",
										lg: "8",
									},
								},
							},
							plugins: [
								require("windicss/plugin/aspect-ratio"),
								require("windicss/plugin/typography"),
								require("windicss/plugin/forms"),
								require("windicss/plugin/line-clamp"),
								require("@windicss/plugin-animations")({
									settings: {},
								}),
								require("@windicss/plugin-scrollbar"),
								require("@windicss/plugin-question-mark"),
								require("@windicss/plugin-heropatterns")({
									includeThemeColors: true,
									patterns: [
										"topography",
										"hideout",
										"bubbles",
										"squares",
										"squares-in-squares",
										"autumn",
										"bamboo",
										"charlie-brown",
										"death-star",
										"endless-clouds",
										"heavy-rain",
										"overcast",
										"slanted-stars",
										"volcano-lamp",
									],
									colors: {
										default: "primary",
										purple: "purple",
										pink: "pink",
									},
									variants: [],
								}),
							],
						},
					}),
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
					render = require("../dist/server/entry-server.js");
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
					console.log("redirecting");
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
