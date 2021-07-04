import { FunctionComponent, AnyComponent } from "preact";
import DynamicElement from "../DynamicElement";

export interface ActionIconProps {
	as?: string | AnyComponent;
	[key: string]: any;
}

const ActionIcon: FunctionComponent<ActionIconProps> = ({
	as = "button",
	...props
}) => {
	return (
		<DynamicElement
			as={as}
			{...props}
			// dark:text-dark-500 light:hover:bg-dark-200 dark:hover:bg-light-300 light:text-light-500 light:bg-dark-400 light:text-light-400 dark:bg-light-600 dark:hover:text-purple-600
			// light:focus:outline-solid-dark-400 dark:focus:outline-solid-white
			class={`rounded-xl no-underline inline-flex w-auto shadow p-4 transform transition-all translate-0 duration-150 items-center !active:translate-y-1 hover:-translate-y-1 focus:-translate-y-1
				shadow-md

				light:shadow-dark-500
				light:bg-light-200
				light:text-dark-500
				light:hover:text-purple-500
				light:hover:bg-light-100

				dark:shadow-dark-900
				dark:bg-dark-400
				dark:text-light-900
				dark:hover:text-purple-500
			${props.class ?? ""}`}
		/>
	);
};

export default ActionIcon;
