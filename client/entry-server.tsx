import "virtual:windi.css";
import { render as renderToString } from "preact-render-to-string";
import { Router, Route, CustomHistory } from "preact-router";

const pages = import.meta.globEager("./pages/**/*.tsx");

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages\/(.*)\.tsx/)[1];

	return {
		name,
		path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
		component: pages[path].default,
	};
});

const noop = () => {};

export const render = (url, context) => {
	const customHistory: CustomHistory = {
		location: {
			pathname: url,
			search: "",
		},
		listen: (cb) => () => {
			console.log("listen()");
		},
		push: noop,
		replace: noop,
	};

	const result = renderToString(
		<Router path={url} history={customHistory}>
			{routes.map(({ name, path, component }) => (
				<Route name={name} path={path} component={component} />
			))}
		</Router>
	);

	return result;
};
