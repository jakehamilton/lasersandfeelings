import useSocket from "../../hooks/useSocket";
import ActionButton from "../ActionButton";
import LaserPistolOutline from "../LaserPistolOutline";

const LasersActions = () => {
	const { socket } = useSocket();

	const handleRoll = (amount) => () => {
		socket.emit("game:roll", {
			type: "lasers",
			amount,
		});
	};

	return (
		<div>
			<ActionButton class="w-[190px] font-thick" onClick={handleRoll(1)}>
				<LaserPistolOutline class="stroke-light-500 fill-light-500 mr-3" />
				<span class="font-thick text-size-[1.5rem] tracking-wide py-2">
					Lasers
				</span>
			</ActionButton>
			<div class="flex gap-2">
				<ActionButton
					class="light:bg-opacity-60 dark:bg-opacity-20 hover:bg-opacity-100 flex-grow justify-center"
					onClick={handleRoll(2)}
				>
					+1
				</ActionButton>
				<ActionButton
					class="light:bg-opacity-60 dark:bg-opacity-20 hover:bg-opacity-100 flex-grow justify-center"
					onClick={handleRoll(3)}
				>
					+2
				</ActionButton>
			</div>
		</div>
	);
};

export default LasersActions;
