import { FunctionComponent, AnyComponent } from "preact";
import DynamicElement from "../DynamicElement";
import Loading from "../Loading";

interface ActionButtonProps {
	as?: string | AnyComponent;
	disabled?: boolean;
	loading?: boolean;
	[key: string]: any;
}

const ActionButton: FunctionComponent<ActionButtonProps> = ({
	as = "button",
	children,
	...props
}) => {
	return (
		<DynamicElement
			as={as}
			{...props}
			class={`relative cursor-pointer rounded no-underline inline-flex font-sans font-bold bg-purple-600 mt-2 py-2 px-5 transform transition-all text-light-500 scale-100 duration-175 prose-lg items-center focus:active:bg-purple-800 ${
				props.loading
					? ""
					: "group focus:-translate-y-1 focus:outline-solid-purple-400 hover:-translate-y-1 hover:bg-purple-500 active:-translate-y-1 active:bg-purple-800 focus:active:translate-y-1"
			} ${props.disabled ? "!bg-gray-300 !text-gray-500" : ""} ${
				props.class ?? ""
			}`}
		>
			{props.loading ? (
				<Loading class="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]" />
			) : null}
			<div class={`flex items-center ${props.loading ? "opacity-0" : ""}`}>
				{children}
			</div>
		</DynamicElement>
	);
};

export default ActionButton;
