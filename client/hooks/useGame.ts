import { useContext } from "preact/hooks";
import { GameContext } from "../contexts/game";

const useGame = () => {
	const value = useContext(GameContext);

	if (value === undefined) {
		throw new Error(`useGame() MUST be used within a <GameProvider>`);
	}

	return value;
};

export default useGame;
