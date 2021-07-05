const { useDependencies, useService } = require("@leverage/core");
const { useWebSocket } = require("@leverage/plugin-websocket");

const init = () => {
	useWebSocket({
		event: "game:join",
	});

	useDependencies({
		services: ["games"],
	});
};

const handler = (socket, { id, key }) => {
	const games = useService("games");

	games.join(socket, id, key);
};

module.exports = {
	init,
	handler,
};
