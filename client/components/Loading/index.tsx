import { FunctionComponent } from "preact";

interface LoadingProps {
	class?: string;
	[key: string]: any;
}

const Loading: FunctionComponent<LoadingProps> = (props) => {
	return (
		<div class={`flex w-[20px] h-[20px] ${props.class ?? ""}`}>
			<div class="flex flex-wrap justify-between origin-center w-[20px] w-[20px] animate-spin duration-[1750ms]">
				<div class="w-2 h-2 bg-light-700 rounded-full"></div>
				<div class="w-2 h-2 bg-light-700 rounded-full"></div>
				<div class="w-2 h-2 bg-light-700 rounded-full mt-[4px]"></div>
				<div class="w-2 h-2 bg-light-700 rounded-full mt-[4px]"></div>
			</div>
		</div>
	);
};

export default Loading;
