import { FunctionComponent } from "preact";

export const styles = {
	Alien: "👽",
	Android: "🤖",
	Dangerous: "💣",
	Heroic: "🦸",
	"Hot-Shot": "😎",
	Intrepid: "🤠",
	Savvy: "📚",
};

export const roles = {
	Doctor: "👩‍⚕️",
	Envoy: "🚚",
	Engineer: "👨‍💻",
	Explorer: "🗺️",
	Pilot: "👨‍✈️",
	Scientist: "👨‍🔬",
	Soldier: "👮",
};

export enum Statuses {
	EMPTY = "Nothing Yet",
	SUCCESS = "Success",
	MIXED = "Mixed Success",
	FAILURE = "Failure",
	LASER_FEELINGS = "Laser Feelings",
	CRITICAL = "Critical Success",
}

export interface CharacterInfoProps {
	name: string;
	style: keyof typeof styles;
	role: keyof typeof roles;
	status: Statuses;
}

const CharacterInfo: FunctionComponent<CharacterInfoProps> = ({
	name,
	style,
	role,
	status,
}) => {
	return (
		<div class="flex flex-col transition-all dark:bg-dark-400 rounded-lg overflow-hidden w-55 h-37">
			<div class="dark:bg-dark-500 dark:text-gray-200 font-bold px-4 py-2">
				{name}
			</div>
			<div class="px-4 pt-3 grid grid-rows-2 grid-cols-2 grid-cols-[max-content,1fr]">
				<div>{styles[style]}</div>
				<div class="ml-2 text-gray-200">{style as string}</div>
				<div>{roles[role]}</div>
				<div class="ml-2 text-gray-200">{role as string}</div>
			</div>
			{status === Statuses.LASER_FEELINGS ? (
				<div
					class={`font-thick p-4 pt-2 text-size-[1.5rem] text-center animate animate-bounce-in`}
				>
					<span class="text-purple-600">Laser</span>{" "}
					<span class="text-pink-600">Feelings</span>
				</div>
			) : (
				<div
					key={status}
					class={`flex items-end justify-center flex-grow font-thick p-4 pt-2 text-size-[1.5rem] text-center animate animate-bounce-in ${
						status === Statuses.SUCCESS ? "text-green-600" : ""
					} ${status === Statuses.MIXED ? "text-yellow-600" : ""} ${
						status === Statuses.FAILURE ? "text-red-600" : ""
					} ${status === Statuses.CRITICAL ? "text-green-400" : ""} ${
						status === Statuses.EMPTY
							? "text-gray-600 !font-sans text-size-[1rem] !animate-none"
							: ""
					}`}
				>
					{status}
				</div>
			)}
		</div>
	);
};

export default CharacterInfo;
