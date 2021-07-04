import { Github, Home } from "preact-feather";
import { Link } from "preact-router";
import ActionIcon from "../components/ActionIcon";
import PageLoading from "../components/PageLoading";
import PlayContent from "../components/PlayContent";
import PlayHeader from "../components/PlayHeader";
import useSocket from "../hooks/useSocket";
import LaserPistolFeather from "../assets/laser-pistol-feather.svg";
import LaserPistolOutline from "../components/LaserPistolOutline";
import ActionButton from "../components/ActionButton";
import FeelingsOutline from "../components/FeelingsOutline";
import LasersActions from "../components/LasersActions";
import FeelingsActions from "../components/FeelingsActions";

export const path = "/play/:id";

const Play = () => {
	const { socket, isConnected } = useSocket();

	return (
		<div class="flex flex-col h-[100vh] light:bg-light-300 dark:bg-dark-600">
			{isConnected ? <PlayContent /> : <PageLoading />}
		</div>
	);
};

export default Play;
