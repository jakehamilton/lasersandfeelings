import { FunctionComponent } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";

interface RedirectProps {
	to: string;
	replace?: boolean;
}

const Redirect: FunctionComponent<RedirectProps> = ({ to, replace = true }) => {
	useEffect(() => {
		route(to, replace);
	}, []);

	return null;
};

export default Redirect;
