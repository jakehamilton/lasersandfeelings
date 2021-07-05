const { useDependencies, useService } = require("@leverage/core");
const { useWebSocket } = require("@leverage/plugin-websocket");

const init = () => {
	useWebSocket({
		event: "game:roll",
	});

	useDependencies({
		services: ["games"],
	});
};

const handler = (socket, data) => {
	const games = useService("games");

	games.roll(socket, data);
};

module.exports = {
	init,
	handler,
};
