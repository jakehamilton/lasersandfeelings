const { useDependencies, useService } = require("@leverage/core");
const { useWebSocket } = require("@leverage/plugin-websocket");

const init = () => {
	useWebSocket({
		event: "game:character",
	});
	useDependencies({
		services: ["games"],
	});
};

const handler = (socket, data) => {
	const games = useService("games");

	games.updateCharacter(socket, data);
};

module.exports = {
	init,
	handler,
};
