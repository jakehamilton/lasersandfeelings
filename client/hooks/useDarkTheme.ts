import { useContext } from "preact/hooks";
import { DarkThemeContext } from "../contexts/darkTheme";

const useDarkTheme = () => {
	const value = useContext(DarkThemeContext);

	if (value === undefined) {
		throw new Error(`useDarkTheme() MUST be used within a <DarkThemeProvider>`);
	}

	return value;
};

export default useDarkTheme;
