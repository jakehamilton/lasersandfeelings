import "virtual:windi.css";
import { render as renderToString } from "preact-render-to-string";
import { Router, Route, CustomHistory, route } from "preact-router";
import { SocketProvider } from "./contexts/socket";
import Match from "preact-router/match";
import App from "./App";

const pages = import.meta.globEager("./pages/**/*.tsx");

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages\/(.*)\.tsx/)[1];

	return {
		name,
		path: pages[path].path ?? name === "Home" ? "/" : `/${name.toLowerCase()}`,
		component: pages[path].default,
	};
});

export const render = (url, context) => {
	const customHistory: CustomHistory = {
		location: {
			pathname: url,
			search: "",
		},
		listen: () => () => {},
		push: (path) => {
			context.url = path;
		},
		replace: (path) => {
			context.url = path;
		},
	};

	const result = renderToString(<App path={url} history={customHistory} />);

	return result;
};
