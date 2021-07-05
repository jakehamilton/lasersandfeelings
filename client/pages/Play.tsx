import { Github, Home } from "preact-feather";
import { Link } from "preact-router";
import ActionIcon from "../components/ActionIcon";
import PageLoading from "../components/PageLoading";
import PlayContent from "../components/PlayContent";
import Header from "../components/Header";
import useSocket from "../hooks/useSocket";
import LaserPistolFeather from "../assets/laser-pistol-feather.svg";
import LaserPistolOutline from "../components/LaserPistolOutline";
import ActionButton from "../components/ActionButton";
import FeelingsOutline from "../components/FeelingsOutline";
import LasersActions from "../components/LasersActions";
import FeelingsActions from "../components/FeelingsActions";
import useGame from "../hooks/useGame";
import PlayAuth from "../components/PlayAuth";
import { useEffect, useMemo, useState } from "preact/hooks";
import CreateCharacter from "../components/CreateCharacter";

export const path = "/play/:id";

const Play = () => {
	const { socket, namespace } = useSocket();
	const { joinOwner, isJoined, needsPlayerAuth, game, role } = useGame();

	const ownerKey = useMemo(() => {
		if (import.meta.env.SSR) {
			return "";
		}

		return localStorage.getItem(namespace);
	}, [namespace]);

	useEffect(() => {
		if (namespace.startsWith("/play")) {
			joinOwner(namespace, ownerKey);
		}
	}, [ownerKey, namespace]);

	const renderContent = () => {
		if (isJoined) {
			if (!game || !role || !game.players[socket.id]) {
				return <PageLoading />;
			}

			if (role === "player" && !game.players[socket.id].character) {
				return (
					<div>
						<div class="h-22 light:bg-light-700 dark:bg-dark-500"></div>
						<div class="px-4">
							<CreateCharacter />
						</div>
					</div>
				);
			}

			return <PlayContent />;
		}

		if (needsPlayerAuth) {
			return <PlayAuth />;
		}

		return <PageLoading />;
	};

	return (
		<div class="flex flex-col h-[100vh] light:bg-light-400 dark:bg-dark-600">
			<Header class="absolute top-0 left-0 right-0" />
			{renderContent()}
		</div>
	);
};

export default Play;
