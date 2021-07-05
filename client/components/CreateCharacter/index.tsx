import { ArrowRight, Edit3, Lock, User, Users, Zap } from "preact-feather";
import { useState } from "preact/hooks";
import ActionButton from "../ActionButton";
import { roles, styles } from "../CharacterInfo";
import { Statuses } from "../CharacterStatus";

const CreateCharacter = (props) => {
	const [name, setName] = useState(props.name ?? "");
	const [style, setStyle] = useState(props.style ?? styles.Alien);
	const [role, setRole] = useState(props.role ?? roles.Doctor);

	const [nameError, setNameError] = useState(null);

	const handleChangeName = (event) => {
		setName(event.target.value);
	};

	const handleChangeStyle = (event) => {
		setStyle(event.target.value);
	};

	const handleChangeRole = (event) => {
		setRole(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (name.trim() === "") {
			setNameError("Your character must have a name.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			class={`mx-auto mt-10 max-w-100 px-6 py-4 bg-light-200 shadow-md rounded-lg ${
				props.class ?? ""
			}`}
		>
			<label class="flex flex-col pb-4">
				<span class="prose-xl flex items-center">
					<Edit3 class="mr-2" />
					Name
				</span>
				{nameError ? <span class="text-red-500">{nameError}</span> : null}
				<input
					type="text"
					placeholder="my-room-password"
					class={`rounded border-light-800 mt-1 ${
						nameError ? "border-red-500" : ""
					}`}
					autocomplete="off"
					value={name}
					onChange={handleChangeName}
					name="password"
				/>
			</label>
			<label class="flex flex-col pb-4">
				<span class="prose-xl flex items-center">
					<Zap class="mr-2" />
					Style
				</span>
				<select
					class="rounded border-light-800 mt-1 px-3 py-2"
					onChange={handleChangeStyle}
				>
					{Object.keys(styles).map((style) => (
						<option key={style} value={style}>
							{styles[style]} {style}
						</option>
					))}
				</select>
			</label>
			<label class="flex flex-col pb-4">
				<span class="prose-xl flex items-center">
					<Users class="mr-2" />
					Role
				</span>
				<select
					class="rounded border-light-800 mt-1 px-3 py-2"
					onChange={handleChangeStyle}
				>
					{Object.keys(roles).map((role) => (
						<option key={role} value={role}>
							{roles[role]} {role}
						</option>
					))}
				</select>
			</label>
			<div class="pt-2 flex justify-center">
				<ActionButton type="submit" loading={props.loading}>
					Create <ArrowRight class="ml-2 transition-all group-hover:ml-3" />
				</ActionButton>
			</div>
		</form>
	);
};

export default CreateCharacter;
