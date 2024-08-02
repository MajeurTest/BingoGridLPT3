import GridElement from "../elements/GridElement"
import PlayerSelector from "../elements/Player"
import { useEffect, useState } from "react"
import { Challenge, Player } from "../types/type"
import { Helmet } from "react-helmet"
import Header from "../Header"
import "./grille.css"

const initialChallenges: Challenge[][] = [
	[
		{
			content: "Faire sortir la crotte des sables",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Détruire un graffiti",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Faire 5 combats de boss (plantes visqueuses comprises)",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Finir un chapitre avec les 8 pièces rouges",
			points: 1,
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
			content: "Finir un chapitre en clavier/souris",
			points: 3,
			completion: [false, false, false, false]
		},
		{
			content: "Débloquer la zone 3 (Gelato-les-flots)",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir son premier soleil",
			points: 1,
			completion: [false, false, false, false]
		}
	],
	[
		{
			content: "Trouver une nouvelle \"buse\" de J.E.T.",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Eteindre le cul en feu d'un villageois",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir votre première pièce bleue",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Faire du surf sur un poulpe",
			points: 2,
			completion: [false, false, false, false]
		},
	],
	[
		{
			content: "Débloquer la zone 2 (Port Ricco)",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir 5 soleils",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir un soleil avec 1 barre d'énergie (sur 8)",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir une pièce bleue dans les égouts",
			points: 3,
			completion: [false, false, false, false]
		}
	]
];

const initialPlayers: Player[] = [
	{
		name: "Reynoxx",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Imjum",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Weenside",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Ultra",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
]

function Poule1() {
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
                <title>LPT Bingo | Poule 1</title>
			</Helmet>
			<Header/>

			<h1>Grille Poule 1</h1>

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

export default Poule1
