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
			<Characters />
		</div>
	);
};

export default PlayContent;
