const { v4: uuidv4 } = require("uuid");
const { useConfig, useDependencies, useKeyRef } = require("@leverage/core");
const { useIO } = require("@leverage/plugin-websocket");
const log = require("../lib/log");

const init = () => {
	useConfig({
		is: "service",
		type: "games",
	});

	useDependencies({
		plugins: ["websocket"],
	});

	useKeyRef("games", new Map());
};

const create = () => {
	const gamesRef = useKeyRef("games");

	let id;

	do {
		id = uuidv4();
	} while (gamesRef.current.has(id));

	const key = uuidv4();

	gamesRef.current.set(id, {
		id,
		key,
		players: new Set(),
	});

	log.debug({ scope: "games", event: "create", id });

	return { id, key };
};

module.exports = {
	init,
	create,
};
