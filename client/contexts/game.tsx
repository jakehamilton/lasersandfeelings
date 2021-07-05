import { createContext, FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { getCurrentUrl, route, subscribers } from "preact-router";
import useSocket from "../hooks/useSocket";
import noop from "../util/noop";
import { Statuses } from "../components/CharacterStatus";
import { styles, roles } from "../components/CharacterInfo";

export interface Character {
	name: string;
	style: keyof typeof styles;
	role: keyof typeof roles;
	status: Statuses;
}

export interface Player {
	id: string;
	role: string;
	character: Character | null;
}

export interface Game {
	players: {
		[key: string]: Player;
	};
}

export interface GameContextValue {
	role: string | null;
	game: Game | null;
	joinPlayer: (key: string) => void;
	joinOwner: (id: string, key: string) => void;
	isJoined: boolean;
	joinError: { message: string } | null;
	needsPlayerAuth: boolean;
	playerKey: string | null;
}

export const GameContext = createContext<GameContextValue>({
	role: null,
	game: null,
	joinPlayer: noop,
	joinOwner: noop,
	isJoined: false,
	joinError: null,
	needsPlayerAuth: false,
	playerKey: null,
});

export const GameProvider: FunctionComponent = ({ children }) => {
	const { socket, namespace, setNamespace } = useSocket();
	const [role, setRole] = useState(null);
	const [game, setGame] = useState(null);
	const [isJoined, setIsJoined] = useState(false);
	const [joinError, setJoinError] = useState(null);
	const [needsPlayerAuth, setNeedsPlayerAuth] = useState(false);
	const [playerKey, setPlayerKey] = useState(null);

	useEffect(() => {
		const handleRouteChange = (url) => {
			setNamespace(url);
		};

		handleRouteChange(getCurrentUrl());

		subscribers.push(handleRouteChange);

		return () => {
			subscribers.splice(subscribers.indexOf(handleRouteChange), 1);
		};
	}, []);

	const handleGameRole = ({ role }) => {
		setRole(role);
	};

	const handlePlayerGameJoin = ({ error, playerKey }) => {
		setJoinError(error ?? null);
		setIsJoined(!Boolean(error));
		setPlayerKey(playerKey ?? null);
	};

	const handleOwnerGameJoin = ({ error }) => {
		setJoinError(null);
		setNeedsPlayerAuth(Boolean(error));
		setIsJoined(!Boolean(error));
	};

	const handleGameUpdate = (game) => {
		setGame(game);
	};

	const joinPlayer = (key) => {
		socket.emit("game:join", { id: namespace, key });

		socket.on("game:role", handleGameRole);
		socket.on("game:join", handlePlayerGameJoin);
		socket.on("game:update", handleGameUpdate);
	};

	const joinOwner = (id, key) => {
		socket.emit("game:join", { id, key });

		socket.on("game:role", handleGameRole);
		socket.on("game:join", handleOwnerGameJoin);
		socket.on("game:update", handleGameUpdate);
	};

	useEffect(() => {
		if (namespace.startsWith("/play")) {
			return () => {
				setRole(null);
				setGame(null);
				setIsJoined(false);
				setJoinError(null);

				socket.off("game:role", handleGameRole);
				socket.off("game:join", handlePlayerGameJoin);
				socket.off("game:update", handleGameUpdate);
			};
		}
	}, [namespace]);

	return (
		<GameContext.Provider
			value={{
				role,
				game,
				joinPlayer,
				joinOwner,
				isJoined,
				joinError,
				needsPlayerAuth,
				playerKey,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};
