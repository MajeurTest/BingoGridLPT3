import { Challenge, Player } from "../types/type";
import GridElement from "../elements/GridElement";
import PlayerSelector from "../elements/Player";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";

const initialChallenges: Challenge[][] = [
	[
		{
			content: "Faire le premier soleil des 3 premières zones",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Faire dormir Mario",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Faire du surf sur un poulpe",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Faire un épisode sans prendre de dégât",
			points: 1,
			completion: [false, false, false, false]
		},
	],
	[
		{
			content: "Finir un épisode avec les 8 pièces rouges",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Finir un épisode avec clavier/souris",
			points: 3,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir 5 soleils d'une même zone",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Nettoyer un villageois",
			points: 1,
			completion: [false, false, false, false]
		}
	],
	[
		{
			content: "Obtenir un soleil sans J.E.T.",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Débloquer la zone 2 (Port Ricco)",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir votre premier soleil",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir un soleil avec 100 pièces jaunes",
			points: 3,
			completion: [false, false, false, false]
		},
	],
	[
		{
			content: "Obtenir un soleil en combattant un boss",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir un champi 1up",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Détruire un graffiti",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir 5 pièces bleues",
			points: 2,
			completion: [false, false, false, false]
		}
	]
];

const initialPlayers: Player[] = [
	{
		name: "Jmde",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Exo",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Astunz",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Konai",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
]

function Poule2() {
	const [selectedPlayer, setSelectedPlayer] = useState<number>(-1);
	const [challenges, setChallenges] = useState<Challenge[][]>(initialChallenges);
	const [players, setPlayers] = useState<Player[]>(initialPlayers);

	const onClickPlayer = (event: React.MouseEvent, index: number) => {
		event.preventDefault();
		setSelectedPlayer(selectedPlayer === index ? -1 : index)
	}
	
	const onClickQuest = (event: React.MouseEvent, questLine: number, questColumn: number, isCliked: boolean) => {
		event.preventDefault();
		if (selectedPlayer === -1) return;
		setChallenges((prev) => {
			const copy = prev.map((chal) => chal.map((el) => el));
			copy[questLine][questColumn].completion[selectedPlayer] = isCliked;
			return copy;
		});
		setPlayers((prev) => {
			const copy = [...prev];
			const challenge = challenges[questLine][questColumn]
			copy[selectedPlayer].points += (isCliked ? challenge.points : -challenge.points) / 2
			return copy; 
		})
	};

	const checkPlayerBonus = (selectedPlayer: number) => {
		let bonus = 0;
		for (let i = 0; i < 4; i++) {
			let verticalBonus = true;
			for (let j = 0; j < 4; j++) {
				if (challenges[i][j].completion[selectedPlayer]) {
					continue;
				}
				verticalBonus = false;
				break;
			}
			
			let horinzontalBonus = true;
			for (let j = 0; j < 4; j++) {
				if (challenges[j][i].completion[selectedPlayer]) {
					continue;
				}
				horinzontalBonus = false;
				break;
			}
			
			if (horinzontalBonus) bonus++;
			if (verticalBonus) bonus++
		}

		setPlayers((prev) => {
			const copy = [...prev];
			copy[selectedPlayer].bonus = bonus;
			copy[selectedPlayer].displayPoints = copy[selectedPlayer].points + 2*bonus
			switch (true) {
				case (copy[selectedPlayer].displayPoints >= 43): {
					copy[selectedPlayer].lptPoints = 6;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 30): {
					copy[selectedPlayer].lptPoints = 5;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 23): {
					copy[selectedPlayer].lptPoints = 4;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 15): {
					copy[selectedPlayer].lptPoints = 3;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 8): {
					copy[selectedPlayer].lptPoints = 2;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 3): {
					copy[selectedPlayer].lptPoints = 1;
					break;
				}
			
				default:
					copy[selectedPlayer].lptPoints = 0;
					break;
			}
			return copy;
		});
	}

	useEffect(() => {
		if (selectedPlayer === -1) return;
		checkPlayerBonus(selectedPlayer);
	}, [challenges]);

	return (
		<>
			<Helmet>
                <title>LPT Bingo | Poule 2</title>
			</Helmet>
			<Header/>

			<h1>Grille Poule 2</h1>

			<div className="bingoContainer">
				<div className="playersSelector">
					{players.map((player, playerIndex) => 
						<PlayerSelector key={"player" + playerIndex} player={player} onClickEvent={(event) => onClickPlayer(event, playerIndex)} isSelected={selectedPlayer === playerIndex} playerIndex={playerIndex}/>
					)}
				</div>
				<div className="bingoGrid">
					{challenges.map((challengeRow, rowIndex) => 
						challengeRow.map((challenge, columnIndex) => (
							<GridElement key={"challege" + (rowIndex * 4 + columnIndex)} challenge={challenges[rowIndex][columnIndex]}  onClickEvent={(event) => onClickQuest(event, rowIndex, columnIndex, !challenge.completion[selectedPlayer])}/>
						))
					)}
				</div>
			</div>
		</>
	)
}

export default Poule2
