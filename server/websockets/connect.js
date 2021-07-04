const { useWebSocket } = require("@leverage/plugin-websocket");
const log = require("../lib/log");

const init = () => {
	useWebSocket({
		event: "connect",
	});
};

const handler = (socket) => {
	log.debug({ scope: "websocket", event: "connect", id: socket.id });
};

module.exports = {
	init,
	handler,
};
