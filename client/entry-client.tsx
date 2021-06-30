import "virtual:windi.css";
import { hydrate } from "preact";
import { Router, Route } from "preact-router";

const pages = import.meta.globEager("./pages/**/*.tsx");

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages\/(.*)\.tsx/)[1];

	return {
		name,
		path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
		component: pages[path].default,
	};
});

hydrate(
	<Router>
		{routes.map(({ name, path, component }) => (
			<Route name={name} path={path} component={component} />
		))}
	</Router>,
	document.getElementById("app")
);
