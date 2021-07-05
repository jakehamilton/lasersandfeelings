import { createContext, FunctionComponent } from "preact";
import { useMemo, useState, useEffect } from "preact/hooks";
import noop from "../util/noop";

interface DarkThemeContextValue {
	isDarkTheme: boolean;
	setIsDarkTheme: (isDarkTheme: boolean) => void;
}

export const DarkThemeContext = createContext<DarkThemeContextValue>({
	isDarkTheme: false,
	setIsDarkTheme: noop,
});

export const DarkThemeProvider: FunctionComponent = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(() => {
		if (import.meta.env.SSR) {
			return false;
		}

		const savedIsDarkTheme = localStorage.getItem("isDarkTheme");

		if (savedIsDarkTheme) {
			return true;
		}

		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return true;
		} else {
			return false;
		}
	});

	useEffect(() => {
		if (isDarkTheme) {
			document.documentElement.classList.remove("light");
			document.documentElement.classList.add("dark");
			localStorage.setItem("isDarkTheme", "true");
		} else {
			document.documentElement.classList.remove("dark");
			document.documentElement.classList.add("light");
			localStorage.removeItem("isDarkTheme");
		}
	}, [isDarkTheme]);

	return (
		<DarkThemeContext.Provider
			value={{
				isDarkTheme,
				setIsDarkTheme,
			}}
		>
			{children}
		</DarkThemeContext.Provider>
	);
};
