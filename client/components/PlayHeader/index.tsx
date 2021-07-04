import { Github, Home } from "preact-feather";
import { Link } from "preact-router";
import ActionIcon from "../ActionIcon";

const PlayHeader = () => {
	return (
		<div class="md:container md:mx-auto flex justify-between p-4 w-full">
			<ActionIcon as={Link} href="/" class="">
				<Home />
			</ActionIcon>
			{/* @TODO(jakehamilton): Decide whether we should show the title on this screen. */}
			{/* <div class="flex justify-center text-center">
				<h1 class="font-thick <md:text-size-[1.5rem] text-size-[3rem] light:text-dark-500 dark:text-light-900 self-center">
					Lasers & Feelings
				</h1>
			</div> */}
			<ActionIcon
				as="a"
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/jakehamilton/lasersandfeelings"
				class=""
			>
				<Github />
			</ActionIcon>
		</div>
	);
};

export default PlayHeader;
