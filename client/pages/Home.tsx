import { Download } from "preact-feather";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import ActionButton from "../components/ActionButton";
import Header from "../components/Header";
import Hero from "../components/Hero";
import useSocket from "../hooks/useSocket";

const Home = () => {
	const [isCreatingGame, setIsCreatingGame] = useState(false);
	const { isConnected } = useSocket();

	const handlePlayNow = async () => {
		return;

		setIsCreatingGame(true);

		try {
			const response = await fetch("/api/game/create", {
				method: "POST",
			});

			const { id, ownerKey } = await response.json();

			localStorage.setItem(id, ownerKey);

			route(id);
		} catch (error) {
			console.error("Error", error);
		}
	};

	return (
		<div class="h-[100vh] w-[100vw] overflow-x-hidden overflow-y-auto pb-10 light:bg-light-600 dark:bg-dark-500">
			<Header class="absolute top-0 left-0 right-0" />
			<Hero
				onPlayNow={handlePlayNow}
				isPlayNowLoading={!isConnected || isCreatingGame}
			/>
			<div class="container mx-auto px-6 pt-10 light:text-dark-600 dark:text-light-900">
				<h2 class="font-thick text-size-[2.5rem]">Learn To Play</h2>
				<p class="pt-2 prose-lg">
					Lasers & Feelings is an easy game to learn. Take a look at the rules
					to learn how to play!
				</p>
				<ActionButton
					as="a"
					download
					href="http://onesevendesign.com/lasers_and_feelings_rpg.pdf"
				>
					<Download class="mr-2" /> Download Rules
				</ActionButton>
			</div>
		</div>
	);
};

export default Home;
