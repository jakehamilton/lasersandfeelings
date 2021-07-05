import { FunctionComponent } from "preact";
import { Github, Home, Moon, Sun } from "preact-feather";
import { Link, getCurrentUrl } from "preact-router";
import Match from "preact-router/match";
import useDarkTheme from "../../hooks/useDarkTheme";
import ActionIcon from "../ActionIcon";

interface HeaderProps {
	class?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ class: className = "" }) => {
	const url = getCurrentUrl();

	const { isDarkTheme, setIsDarkTheme } = useDarkTheme();

	const handleToggleDarkTheme = (event: MouseEvent) => {
		setIsDarkTheme(!isDarkTheme);

		if (event.target instanceof HTMLElement) {
			event.target.blur();
		}
	};

	return (
		<div
			class={`lg:container lg:mx-auto flex justify-between p-4 w-full ${className}`}
		>
			<div class="flex gap-2">
				{url !== "/" ? (
					<ActionIcon as={Link} href="/" class="">
						<Home />
					</ActionIcon>
				) : null}
				<ActionIcon onClick={handleToggleDarkTheme}>
					{isDarkTheme ? <Moon /> : <Sun />}
				</ActionIcon>
			</div>
			<div class="flex gap-2">
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
		</div>
	);
};

export default Header;
