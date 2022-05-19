/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Head from "next/head";

const Index = () => {
	const [pokes, setPokes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const getPokes = async () => {
			const res = await fetch(
				"https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json?limit=10&offset=0"
			);

			setLoading(false);
			setPokes(await res.json());
		};

		getPokes();
	}, []);

	console.log("POKES?: ", pokes);

	return (
		<>
			<Head>
				<title>Pokemon || Next.JS</title>
			</Head>

			{loading ? (
				<p>LOADING...</p>
			) : (
				pokes.map((poke) => (
					<a href={`details/${poke.id}`} key={poke.id}>
						<img
							style={{ width: "100px" }}
							src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${poke.image}`}
							alt="Poke image"
						/>

						<p>{poke.name}</p>
					</a>
				))
			)}
		</>
	);
};
export default Index;
