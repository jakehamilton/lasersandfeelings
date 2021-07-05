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

const buildClientState = (game) => {
	const state = {
		players: {},
	};

	for (const [id, data] of game.players.entries()) {
		state.players[id] = data;
	}

	return state;
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
	const io = useIO();

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

	const state = buildClientState(game);

	io.to(id).emit("game:update", state);
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

	const state = buildClientState(game);

	io.to(id).emit("game:update", state);
};

const updateCharacter = (socket, data) => {
	const io = useIO();
	const { current: games } = useKeyRef("games");

	const rooms = [...socket.rooms].filter((room) => room !== socket.id);

	if (rooms.length === 0) {
		log.debug("not in any rooms");
		return;
	}

	if (rooms.length > 1) {
		log.debug("in too many rooms");
		return;
	}

	const room = rooms[0];

	if (!games.has(room)) {
		log.debug("room doesn't exist");
		return;
	}

	const game = games.get(room);

	if (!game.players.has(socket.id)) {
		log.debug("not a player in the room");
		return;
	}

	const player = game.players.get(socket.id);

	player.character = {
		name: data.name,
		style: data.style,
		role: data.role,
		number: data.number,
		status: "",
		lastRoll: new Date(),
	};

	const state = buildClientState(game);

	io.to(room).emit("game:update", state);

	socket.emit("game:character");
};

const roll = (socket, data) => {
	const io = useIO();
	const { current: games } = useKeyRef("games");

	const rooms = [...socket.rooms].filter((room) => room !== socket.id);

	if (rooms.length === 0) {
		log.debug("not in any rooms");
		return;
	}

	if (rooms.length > 1) {
		log.debug("in too many rooms");
		return;
	}

	const room = rooms[0];

	if (!games.has(room)) {
		log.debug("room doesn't exist");
		return;
	}

	const game = games.get(room);

	if (!game.players.has(socket.id)) {
		log.debug("not a player in the room");
		return;
	}

	const player = game.players.get(socket.id);

	let isLaserFeelings = false;
	let successes = 0;

	for (let i = 0; i < data.amount; i++) {
		const roll = Math.floor(Math.random() * 6) + 1;

		if (roll === player.character.number) {
			isLaserFeelings = true;
			break;
		}

		if (
			(data.type === "feelings" && roll > player.character.number) ||
			(data.type === "lasers" && roll < player.character.number)
		) {
			successes += 1;
		}
	}

	if (isLaserFeelings) {
		player.character.status = "Laser Feelings";
	} else if (successes === 0) {
		player.character.status = "Failure";
	} else if (successes === 1) {
		player.character.status = "Mixed Success";
	} else if (successes === 2) {
		player.character.status = "Success";
	} else if (successes === 3) {
		player.character.status = "Critical Success";
	}

	player.character.lastRoll = new Date();

	const state = buildClientState(game);

	io.to(room).emit("game:update", state);
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
	updateCharacter,
	roll,
};
