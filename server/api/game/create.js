const { v4: uuidv4 } = require("uuid");
const { useHTTP } = require("@leverage/plugin-http");
const { useDependencies, useService } = require("@leverage/core");

const init = () => {
	useHTTP({
		path: "/api/game/create",
		method: "POST",
	});

	useDependencies({
		services: ["games"],
	});
};

const handler = (request, reply) => {
	const games = useService("games");

	const metadata = games.create();

	reply.send(metadata);
};

module.exports = {
	init,
	handler,
};
