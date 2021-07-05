import { FunctionComponent } from "preact";
import Router, { CustomHistory, Route, route } from "preact-router";
import Redirect from "./components/Redirect";
import { DarkThemeProvider } from "./contexts/darkTheme";
import { GameProvider } from "./contexts/game";
import { SocketProvider } from "./contexts/socket";
import routes from "./util/routes";

interface AppProps {
	path?: string;
	history?: CustomHistory;
}

const App: FunctionComponent<AppProps> = ({
	path = undefined,
	history = undefined,
}) => {
	return (
		<SocketProvider>
			<GameProvider>
				<DarkThemeProvider>
					<Router path={path} history={history}>
						{routes.map(({ name, path, component }) => (
							<Route name={name} path={path} component={component} />
						))}
						{/* Redirect all other paths to the home page. */}
						<Redirect path="/:path+" to="/" />
					</Router>
				</DarkThemeProvider>
			</GameProvider>
		</SocketProvider>
	);
};

export default App;
