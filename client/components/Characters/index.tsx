import useGame from "../../hooks/useGame";
import CharacterInfo from "../CharacterInfo";
import { Statuses } from "../CharacterStatus";

const Characters = () => {
	const { game } = useGame();

	if (!game) {
		return null;
	}

	const renderCharacters = () => {
		const ids = Object.keys(game.players);

		const vdom = ids.map((id) => {
			const player = game.players[id];

			if (player.role === "owner") {
				return null;
			}

			const { character } = player;

			if (character === null) {
				return null;
			}

			return (
				<CharacterInfo
					name={character.name}
					style={character.style}
					role={character.role}
					status={character.status}
					lastRoll={character.lastRoll}
				/>
			);
		});

		return vdom;
	};

	return (
		<div class="flex justify-center flex-wrap pt-10 px-8 gap-4">
			{renderCharacters()}
		</div>
	);
};

export default Characters;
