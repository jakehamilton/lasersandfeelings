import CharacterInfo, { Statuses } from "../CharacterInfo";
import FeelingsActions from "../FeelingsActions";
import LasersActions from "../LasersActions";
import PlayHeader from "../PlayHeader";

const PlayContent = () => {
	return (
		<div class="flex flex-col items-center flex-grow overflow-x-hidden overflow-x-auto pb-20">
			<div class="light:bg-light-700 dark:bg-dark-500 pb-10 w-[100vw] flex flex-col items-center">
				<PlayHeader />
				<div class="flex justify-center flex-wrap gap-x-8 gap-y-6">
					<LasersActions />
					<FeelingsActions />
				</div>
			</div>
			<div class="flex justify-center flex-wrap pt-10 gap-4">
				<CharacterInfo
					name="Captain Darcy"
					style="Alien"
					role="Doctor"
					status={Statuses.EMPTY}
				/>
				<CharacterInfo
					name="Captain Darcy"
					style="Android"
					role="Engineer"
					status={Statuses.SUCCESS}
				/>
				<CharacterInfo
					name="Captain Darcy"
					style="Dangerous"
					role="Envoy"
					status={Statuses.MIXED}
				/>
				<CharacterInfo
					name="Captain Darcy"
					style="Heroic"
					role="Explorer"
					status={Statuses.FAILURE}
				/>
				<CharacterInfo
					name="Captain Darcy"
					style="Hot-Shot"
					role="Pilot"
					status={Statuses.LASER_FEELINGS}
				/>
				<CharacterInfo
					name="Captain Darcy"
					style="Intrepid"
					role="Scientist"
					status={Statuses.CRITICAL}
				/>
				<CharacterInfo
					name="Captain Darcy"
					style="Savvy"
					role="Soldier"
					status={Statuses.EMPTY}
				/>
			</div>
		</div>
	);
};

export default PlayContent;
