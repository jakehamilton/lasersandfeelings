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

const create = ({ playerKey = "" } = {}) => {
	const { current: games } = useKeyRef("games");

	let id;

	do {
		id = uuidv4();
	} while (games.has(id));

	id = `/play/${id}`;

	const ownerKey = uuidv4();

	games.set(id, {
		id,
		ownerKey,
		playerKey,
		players: new Map(),
	});

	log.debug({ scope: "games", event: "create", id });

	return { id, ownerKey };
};

const leave = (socket, id) => {
	const { current: games } = useKeyRef("games");

	if (!games.has(id)) {
		return;
	}

	const game = games.get(id);

	if (game.players.has(socket.id)) {
		game.players.delete(socket.id);
	}

	if (game.players.size === 0) {
		games.delete(id);
	}
};

const join = (socket, id, key) => {
	const io = useIO();
	const { current: games } = useKeyRef("games");

	const isValid = games.has(id);

	if (!isValid) {
		const message = "Game ID does not exist. Is this the right link?";

		log.debug({ scope: "games", event: "game:join:error", message, id });
		socket.emit("game:join", { error: { message } });
		return;
	}

	const game = games.get(id);

	const isOwnerKey = key === game.ownerKey;
	const isPlayerKey = key === game.playerKey;

	if (!isOwnerKey && !isPlayerKey) {
		const message = "Incorrect password.";

		log.debug({ scope: "games", event: "game:join:error", message });
		socket.emit("game:join", { error: { message } });
		return;
	}

	const rooms = [...socket.rooms].filter((room) => room !== socket.id);

	for (const room of rooms) {
		leave(socket, room);
	}

	socket.join(id);

	const role = isOwnerKey ? "owner" : "player";

	game.players.set(socket.id, {
		role,
		character: null,
	});

	socket.emit("game:role", { role });

	socket.emit("game:join", { id, playerKey: game.playerKey });

	const state = {
		players: {},
	};

	for (const [id, data] of game.players.entries()) {
		state.players[id] = data;
	}

	io.to(id).emit("game:update", state);
};

const auth = (id, key) => {
	const { current: games } = useKeyRef("games");

	return games.has(id) && games.get(id).key === key;
};

module.exports = {
	init,
	create,
	join,
	auth,
	leave,
};
