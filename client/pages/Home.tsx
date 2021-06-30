import { useEffect, useState } from "preact/hooks";

const Home = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log("here");
		const interval = setInterval(() => {
			setCount((c) => c + 1);
		}, 1_000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="container mx-auto serif">
			Home
			{count}
		</div>
	);
};

export default Home;
