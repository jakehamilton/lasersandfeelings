const pages = import.meta.globEager("./pages/**/*.tsx");

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages\/(.*)\.tsx/)[1];

	return {
		name,
		path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
		component: pages[path].default,
	};
});

export default routes;
