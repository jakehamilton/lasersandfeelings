const { useDependencies, useService } = require("@leverage/core");
const { useWebSocket } = require("@leverage/plugin-websocket");

const log = require("../../lib/log");

const init = () => {
	useWebSocket({
		event: "game:auth",
	});

	useDependencies({
		services: ["games"],
	});
};

const handler = (socket, { key }) => {
	log.debug({ scope: "websocket", event: "game:auth", key });

	console.log([...socket.rooms].filter((x) => x !== socket.id));

	const games = useService("games");
};

module.exports = {
	init,
	handler,
};
