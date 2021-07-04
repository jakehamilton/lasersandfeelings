import ActionButton from "../ActionButton";
import FeelingsOutline from "../FeelingsOutline";

const FeelingsActions = () => {
	return (
		<div>
			<ActionButton class="font-thick w-[190px] bg-pink-500 hover:bg-pink-400 active:bg-pink-700 focus:active:bg-pink-700 focus:outline-solid-pink-400">
				<FeelingsOutline class="stroke-light-500 fill-light-500 mr-3" />
				<span class="font-thick text-size-[1.5rem] tracking-wide py-2">
					Feelings
				</span>
			</ActionButton>
			<div class="flex gap-2">
				<ActionButton class="light:bg-opacity-60 dark:bg-opacity-20 hover:bg-opacity-100 bg-pink-500 flex-grow justify-center hover:bg-pink-400 active:bg-pink-700 focus:active:bg-pink-700 focus:outline-solid-pink-400">
					+1
				</ActionButton>
				<ActionButton class="light:bg-opacity-60 dark:bg-opacity-20 hover:bg-opacity-100 bg-pink-500 flex-grow justify-center hover:bg-pink-400 active:bg-pink-700 focus:active:bg-pink-700 focus:outline-solid-pink-400">
					+2
				</ActionButton>
			</div>
		</div>
	);
};

export default FeelingsActions;
