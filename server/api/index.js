const { useHTTP } = require("@leverage/plugin-http");

const init = () => {
	useHTTP({
		path: "/api",
		method: "GET",
	});
};

const handler = (request, reply) => {
	reply.send({ message: "Hello, World" });
};

module.exports = {
	init,
	handler,
};
