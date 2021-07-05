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

	const body = JSON.parse(request.body);

	const metadata = games.create(body);

	reply.send(metadata);
};

module.exports = {
	init,
	handler,
};
