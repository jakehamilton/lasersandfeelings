import ActionButton from "../ActionButton";
import LaserPistolOutline from "../LaserPistolOutline";

const LasersActions = () => {
	return (
		<div>
			<ActionButton class="w-[190px] font-thick">
				<LaserPistolOutline class="stroke-light-500 fill-light-500 mr-3" />
				<span class="font-thick text-size-[1.5rem] tracking-wide py-2">
					Lasers
				</span>
			</ActionButton>
			<div class="flex gap-2">
				<ActionButton class="light:bg-opacity-60 dark:bg-opacity-20 hover:bg-opacity-100 flex-grow justify-center">
					+1
				</ActionButton>
				<ActionButton class="light:bg-opacity-60 dark:bg-opacity-20 hover:bg-opacity-100 flex-grow justify-center">
					+2
				</ActionButton>
			</div>
		</div>
	);
};

export default LasersActions;
