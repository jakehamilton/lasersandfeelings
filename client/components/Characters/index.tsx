import CharacterInfo from "../CharacterInfo";
import { Statuses } from "../CharacterStatus";

const Characters = () => {
	return (
		<div class="flex justify-center flex-wrap pt-10 px-8 gap-4">
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
	);
};

export default Characters;
