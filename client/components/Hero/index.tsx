import { FunctionComponent } from "preact";
import { ArrowRight, Github, Twitter } from "preact-feather";
import { Link } from "preact-router";
import { useState, useEffect } from "preact/hooks";
import useSocket from "../../hooks/useSocket";
import noop from "../../util/noop";
import ActionButton from "../ActionButton";
import ActionIcon from "../ActionIcon";

interface HeroProps {
	isPlayNowLoading?: boolean;
	onPlayNow?: (event: MouseEvent) => void;
}

const Hero: FunctionComponent<HeroProps> = ({
	isPlayNowLoading = false,
	onPlayNow = noop,
}) => {
	return (
		<div class="relative flex h-xl light:bg-hero-topography-purple-400 dark:bg-hero-topography-purple-800 items-center light:bg-light-300 dark:bg-dark-600">
			<div class="container flex flex-col mx-auto px-6 items-start justify-center">
				<h1 class="font-thick text-size-[4rem] light:text-dark-600 dark:text-light-900">
					Lasers & Feelings
				</h1>
				<ActionButton as={Link} href="/create">
					Play Now <ArrowRight class="ml-2 transition-all group-hover:ml-3" />
				</ActionButton>
			</div>
			<div class="absolute w-full text-center bottom-0 px-8 pb-4 light:text-dark-600 dark:text-light-900 font-thick text-size-[1.5rem]">
				<span class="flex items-center gap-2 justify-center">
					Original game by{" "}
					<a
						href="https://twitter.com/john_harper"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 text-blue-400 hover:underline flex-nowrap"
					>
						<Twitter size={24} /> @john_harper
					</a>
				</span>
				<span class="flex items-center gap-2 justify-center mt-1">
					Web App by{" "}
					<a
						href="https://twitter.com/jakehamiltondev"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 text-blue-400 hover:underline flex-nowrap"
					>
						<Twitter size={24} /> @jakehamiltondev
					</a>
				</span>
				<span class="flex items-center justify-end flex-col mt-4 gap-1">
					<span>This web app is an unofficial fan project</span>
					<span class="flex items-center gap-[0.35rem]">
						{/* Please direct feedback and support requests to the project's{" "} */}
						<a
							href="https://github.com/jakehamilton/lasersandfeelings/issues"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1 text-blue-400 hover:underline flex-nowrap"
						>
							<Github size={24} /> Report an issue
						</a>
					</span>
				</span>
			</div>
		</div>
	);
};

export default Hero;
