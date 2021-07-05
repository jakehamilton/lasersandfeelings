import CharacterInfo from "../CharacterInfo";
import Characters from "../Characters";
import CharacterStatus, { Statuses } from "../CharacterStatus";
import FeelingsActions from "../FeelingsActions";
import LasersActions from "../LasersActions";
import Header from "../Header";
import useGame from "../../hooks/useGame";
import useSocket from "../../hooks/useSocket";
import { useMemo } from "preact/hooks";

const PlayContent = () => {
	const { socket } = useSocket();
	const { role, game } = useGame();

	return (
		<div class="flex flex-col items-center flex-grow overflow-x-hidden overflow-x-auto pb-20">
			<div
				class={`${
					role === "player" ? "pt-22 <md:pt-35" : "pt-12"
				} light:bg-light-700 dark:bg-dark-500 pb-10 w-[100vw] flex flex-col items-center`}
			>
				{role === "player" ? (
					<>
						<CharacterStatus
							status={game.players[socket.id].character.status}
							lastRoll={game.players[socket.id].character.lastRoll}
							class="text-size-[3rem] pb-6"
						/>
						<div class="flex justify-center flex-wrap gap-x-8 gap-y-6 px-8 <md:pt-4">
							<LasersActions />
							<FeelingsActions />
						</div>
					</>
				) : null}
			</div>
			{role === "owner" && Object.keys(game.players).length === 1 ? (
				<div class="flex flex-col items-center px-4">
					<h1 class="text-size-[2.5rem] light:text-dark-300 dark:text-light-900 pt-8">
						All Set!
					</h1>
					<span class="block mt-3 text-size-[1.15rem] light:text-dark-300 dark:text-light-900">
						Share the link to this page with your friends to play.
					</span>
					<span class="block mt-[6px] text-size-[1.15rem] light:text-dark-300 dark:text-light-900">
						You'll see the characters they create once they join!
					</span>
					<span class="block mt-4 rounded light:text-blue-500 light:bg-light-700 dark:text-blue-400 dark:bg-dark-400 py-1 px-2">
						{window.location.href}
					</span>
				</div>
			) : null}
			<Characters />
		</div>
	);
};

export default PlayContent;
