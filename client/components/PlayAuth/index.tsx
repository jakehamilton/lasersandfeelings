import { ArrowRight, Lock } from "preact-feather";
import { useEffect, useMemo, useState } from "preact/hooks";
import useGame from "../../hooks/useGame";
import useSocket from "../../hooks/useSocket";
import ActionButton from "../ActionButton";

const PlayAuth = () => {
	const { joinPlayer, joinError } = useGame();

	const [password, setPassword] = useState("");

	const handleChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		joinPlayer(password);
	};

	return (
		<div>
			<div class="h-22 light:bg-light-700 dark:bg-dark-500"></div>
			<div class="px-4">
				<form
					onSubmit={handleSubmit}
					class="mx-auto mt-10 max-w-100 px-6 py-4 bg-light-200 shadow-md rounded-lg"
				>
					<label class="flex flex-col">
						<span class="prose-xl flex items-center">
							<Lock class="inline-block mr-1" size={20} />
							Password
						</span>
						{joinError ? (
							<span class="text-red-500">{joinError.message}</span>
						) : null}
						<input
							type="password"
							placeholder="my-room-password"
							class={`rounded border-light-800 mt-1 ${
								joinError ? "border-red-500" : ""
							}`}
							autocomplete="off"
							value={password}
							onChange={handleChange}
							name="password"
						/>
					</label>
					<div class="pt-2 flex justify-center">
						<ActionButton type="submit">
							Join <ArrowRight class="ml-2 transition-all group-hover:ml-3" />
						</ActionButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PlayAuth;
