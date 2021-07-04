const { useWebSocket } = require("@leverage/plugin-websocket");
const log = require("../lib/log");

const init = () => {
	useWebSocket({
		event: "disconnect",
	});
};

const handler = (socket) => {
	log.debug({ scope: "websocket", event: "disconnect", id: socket.id });
};

module.exports = {
	init,
	handler,
};
