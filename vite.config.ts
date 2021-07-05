import * as path from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import fonts from "vite-plugin-fonts";
import windicss from "vite-plugin-windicss";

import pluginAspectRatio from "windicss/plugin/aspect-ratio";
import pluginTypography from "windicss/plugin/typography";
import pluginForms from "windicss/plugin/forms";
import pluginLineClamp from "windicss/plugin/line-clamp";
import pluginAnimations from "@windicss/plugin-animations";
import pluginScrollbar from "@windicss/plugin-scrollbar";
import pluginQuestionMark from "@windicss/plugin-question-mark";
import pluginHeroPatterns from "@windicss/plugin-heropatterns";

const isProd = process.env.NODE_ENV !== "development";

const project = path.dirname(import.meta.url).replace("file://", "");
const client = path.resolve(project, "client");
const publicDir = path.resolve(project, "public");

export default defineConfig({
	root: client,
	publicDir: publicDir,
	logLevel: isProd ? "info" : "error",
	clearScreen: false,
	server: {
		middlewareMode: true,
	},
	plugins: [
		preact(),
		fonts({
			google: {
				display: "swap",
				families: ["Staatliches", "Inter"],
			},
		}),
		windicss({
			root: client,
			scan: {
				include: [path.resolve(client, "**/*.tsx"), "./**/*.tsx"],
			},
			config: {
				darkMode: "class",
				theme: {
					extend: {
						fontFamily: {
							thick: "Staatliches",
							sans: "Inter",
						},
						lineClamp: {
							sm: "2",
							lg: "6",
						},
					},
				},
				plugins: [
					pluginAspectRatio,
					pluginTypography,
					pluginForms,
					pluginLineClamp,
					pluginAnimations({
						settings: {},
					}),
					pluginScrollbar,
					pluginQuestionMark,
					pluginHeroPatterns({
						includeThemeColors: true,
						patterns: ["topography"],
						colors: {
							default: "primary",
							purple: "purple",
							pink: "pink",
						},
					}),
				],
			},
		}),
	],
});
