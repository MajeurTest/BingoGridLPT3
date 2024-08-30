import { Challenge, Player } from "../types/type";
import GridElement from "../elements/GridElement";
import PlayerSelector from "../elements/Player";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../Header";


const initialChallenges: Challenge[][] = [
	[
		{
			content: "Obtenir un soleil caché sur la place Delphino",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Effectuer une supercharge au sol",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Faire sortir la crotte des sables",
			points: 2,
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
			content: "Combattre un boss sans perdre un PV de l'épisode",
			points: 3,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir un champi 1up",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Se faire envoyer en l'air",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Trouver une nouvelle \"buse\" de JET",
			points: 2,
			completion: [false, false, false, false]
		}
	],
	[
		{
			content: "Débloquer la zone 3 (Gelato-les-flots)",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Eclater un boss d'épisode pour la 2ème fois",
			points: 2,
			completion: [false, false, false, false]
		},
		{
			content: "Eteindre le cul en feu d'un villegeois",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir un soleil depuis un niveau caché de la Place Delphino",
			points: 3,
			completion: [false, false, false, false]
		},
	],
	[
		{
			content: "Regarder le soleil sale depuis le dessin du soleil au sol",
			points: 1,
			completion: [false, false, false, false]
		},
		{
			content: "Obtenir 10 pièces bleues",
			points: 3,
			completion: [false, false, false, false]
		},
		{
			content: "Prendre le canon direction le parc Pinna",
			points: 3,
			completion: [false, false, false, false]
		},
		{
			content: "Faire un épisode sans prendre de dégât",
			points: 1,
			completion: [false, false, false, false]
		}
	]
];

const initialPlayers: Player[] = [
	{
		name: "Joueur 1",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Joueur 2",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Joueur 3",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Joueur 4",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
]

function Finale() {
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
			copy[selectedPlayer].displayPoints = copy[selectedPlayer].points + 2*bonus;
			switch (true) {
				case (copy[selectedPlayer].displayPoints >= 48): {
					copy[selectedPlayer].lptPoints = 6;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 35): {
					copy[selectedPlayer].lptPoints = 5;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 28): {
					copy[selectedPlayer].lptPoints = 4;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 20): {
					copy[selectedPlayer].lptPoints = 3;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 13): {
					copy[selectedPlayer].lptPoints = 2;
					break;
				}

				case (copy[selectedPlayer].displayPoints >= 5): {
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
                <title>LPT Bingo | Finale</title>
			</Helmet>
			<Header/>

			<h1>Grille Finale</h1>

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

export default Finale
