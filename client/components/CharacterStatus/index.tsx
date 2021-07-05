import { FunctionComponent } from "preact";

const placeholders = [
	"Ready!",
	"Locked & Loaded",
	"Phasers to Fun",
	"Embrace My Love",
	"Ready For Love",
	"Ready 😭",
	"PEW PEW PEW",
	"Ludicrous Speed",
	"Emotionally Ready",
	"Let's Go Already!",
	"Space Love",
];

const randomEmptyMessage = () => {
	const index = Math.floor(Math.random() * placeholders.length);

	return placeholders[index];
};

export enum Statuses {
	EMPTY = "",
	SUCCESS = "Success",
	MIXED = "Mixed Success",
	FAILURE = "Failure",
	LASER_FEELINGS = "Laser Feelings",
	CRITICAL = "Critical Success",
}

interface CharacterStatusProps {
	status: Statuses;
	class?: string;
	[key: string]: any;
}

const CharacterStatus: FunctionComponent<CharacterStatusProps> = ({
	status,
	class: className,
	...props
}) => {
	return status === Statuses.LASER_FEELINGS ? (
		<div
			key={status}
			{...props}
			class={`font-thick animate animate-bounce-in ${className ?? ""}`}
		>
			<span class="text-purple-600">Laser</span>&nbsp;
			<span class="text-pink-600">Feelings</span>
		</div>
	) : (
		<div
			key={status}
			{...props}
			class={`font-thick animate animate-bounce-in ${
				status === Statuses.SUCCESS ? "text-green-500" : ""
			} ${status === Statuses.MIXED ? "text-yellow-500" : ""} ${
				status === Statuses.FAILURE ? "text-red-500" : ""
			} ${
				status === Statuses.CRITICAL
					? "dark:text-green-300 light:text-green-400"
					: ""
			} ${
				status === Statuses.EMPTY ? "dark:text-dark-50 light:text-gray-400" : ""
			} ${className ?? ""}`}
		>
			{status === Statuses.EMPTY ? randomEmptyMessage() : status}
		</div>
	);
};

export default CharacterStatus;
