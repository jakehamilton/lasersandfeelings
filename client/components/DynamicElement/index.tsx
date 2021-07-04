import { FunctionComponent, AnyComponent } from "preact";

export interface DynamicElementProps {
	as: string | AnyComponent;
	[key: string]: any;
}

const DynamicElement: FunctionComponent<DynamicElementProps> = ({
	as,
	children,
	...props
}) => {
	// @ts-ignore
	return h(as, props, children);
};

export default DynamicElement;
