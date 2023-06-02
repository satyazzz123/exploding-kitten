import { useEffect, useState } from "react";


function Leaderboard() {
	const [playerData, setPlayerData] = useState([]);
	const pollingInterval = 8000;
	const fetchPlayers = async () => {
		try {
			const response = await fetch(`http://localhost:3000/users`, {
				method: "GET",
			});
			const data = await response.json();
			if (Array.isArray(data)) setPlayerData(data);
		} catch (error) {
			console.error("Failed to fetch", error);
		}
	};
	useEffect(() => {
		fetchPlayers();
		const interval = setInterval(fetchPlayers, pollingInterval);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className="leaderboard">
			<h2 style={{marginBottom:"5px"}}>LEADERBOARD </h2>
			<table id="leaderboard">
				<thead>
					<tr>
						<th>Player</th>
						<th>Score</th>
						<th>Games Played</th>
					</tr>
				</thead>
				<tbody>
					{playerData.length > 0 &&
						playerData.map(({ entityId, username, score, noOfGamesPlayed }) => (
							<tr key={entityId}>
								<td>{username}</td>
								<td>{score}</td>
								<td>{noOfGamesPlayed}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default Leaderboard;
