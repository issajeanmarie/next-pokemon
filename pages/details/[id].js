/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Details = () => {
	const [poke, setPoke] = useState(null);
	const [loading, setLoading] = useState(false);

	const {
		query: { id },
	} = useRouter();

	useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			if (!id) return;

			const res = await fetch(
				`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
			);

			console.log("RES: ", res);

			setPoke(await res.json());
			setLoading(false);
		};

		fetchData();
	}, [id]);

	console.log("ONE POKE: ", poke);

	return loading ? (
		<p>Loading...</p>
	) : (
		<div>
			<Link href="/">Go back</Link>
			<br />
			<br />

			<img
				style={{ width: "400px" }}
				src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${poke?.image}`}
				alt=""
			/>
			<p>{poke?.name}</p>
		</div>
	);
};

export default Details;
