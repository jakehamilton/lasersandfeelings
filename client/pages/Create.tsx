import { ArrowRight, Lock } from "preact-feather";
import { route } from "preact-router";
import { useState } from "preact/hooks";
import ActionButton from "../components/ActionButton";
import Header from "../components/Header";

const Create = () => {
	const [password, setPassword] = useState("");
	const [isCreatingGame, setIsCreatingGame] = useState(false);

	const handleChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setIsCreatingGame(true);

		try {
			const response = await fetch("/api/game/create", {
				method: "POST",
				body: JSON.stringify({ playerKey: password }),
			});

			const { id, ownerKey } = await response.json();

			localStorage.setItem(id, ownerKey);

			route(id);
		} catch (error) {
			console.error("Error", error);
		}
	};

	return (
		<div class="flex flex-col h-[100vh] light:bg-light-400 dark:bg-dark-600">
			<Header class="absolute top-0 left-0 right-0" />
			<div class="h-22 light:bg-light-700 dark:bg-dark-500"></div>
			<div class="px-4">
				<form
					onSubmit={handleSubmit}
					class="mx-auto mt-10 max-w-100 px-6 py-4 bg-light-200 shadow-md rounded-lg"
				>
					<label class="flex flex-col">
						<span class="prose-xl flex items-center">
							<Lock class="inline-block mr-1" size={20} />
							Create A Password
						</span>
						<input
							type="password"
							placeholder="my-room-password"
							class="rounded border-light-800 mt-1"
							autocomplete="off"
							value={password}
							onChange={handleChange}
							name="password"
						/>
					</label>
					<div class="pt-2 flex justify-center">
						<ActionButton type="submit" loading={isCreatingGame}>
							Create <ArrowRight class="ml-2 transition-all group-hover:ml-3" />
						</ActionButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Create;
