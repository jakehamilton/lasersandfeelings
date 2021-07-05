import { FunctionComponent } from "preact";
import { ArrowRight, Github } from "preact-feather";
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
		<div class="flex h-xl bg-hero-topography-purple-900 items-center light:bg-light-300 dark:bg-dark-600">
			<div class="container flex flex-col mx-auto px-6 items-start justify-center">
				<h1 class="font-thick text-size-[4rem] light:text-dark-600 dark:text-light-900">
					Lasers & Feelings
				</h1>
				<ActionButton as={Link} href="/create">
					Play Now <ArrowRight class="ml-2 transition-all group-hover:ml-3" />
				</ActionButton>
			</div>
		</div>
	);
};

export default Hero;
