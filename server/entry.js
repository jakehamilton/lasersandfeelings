const { add, remove, emit, once } = require("@leverage/core");
const { http } = require("@leverage/plugin-http");
const { websocket } = require("@leverage/plugin-websocket");
const requireAll = require("require-dir-all");

const cleanup = () => {
	once("http:closed", () => {
		process.exit(1);
	});
	emit("http:close");
};

const main = async () => {
	try {
		add(http, websocket);

		requireAll(__dirname, {
			recursive: true,
			map: ({ exports }) => {
				if (
					exports &&
					Object.keys(exports).length &&
					exports.hasOwnProperty("init")
				) {
					add(exports);
				}
			},
		});

		emit("http:configure", {});

		emit("http:listen", {
			port: 8080,
			host: "0.0.0.0",
		});

		emit("websocket:attach", {});
	} catch (error) {
		console.log("error!");
		console.error(error);
	}
};

process.on("SIGINT", cleanup);

main();
