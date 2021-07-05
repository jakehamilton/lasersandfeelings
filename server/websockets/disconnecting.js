const { useDependencies, useService } = require("@leverage/core");
const { useWebSocket } = require("@leverage/plugin-websocket");
const log = require("../lib/log");

const init = () => {
	useWebSocket({
		event: "disconnecting",
	});
	useDependencies({
		services: ["games"],
	});
};

const handler = (socket) => {
	log.debug({ scope: "websocket", event: "disconnecting", id: socket.id });
	const games = useService("games");

	const rooms = [...socket.rooms].filter((room) => room !== socket.id);

	for (const room of rooms) {
		games.leave(socket, room);
	}
};

module.exports = {
	init,
	handler,
};
