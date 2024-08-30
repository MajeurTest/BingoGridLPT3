import { Helmet } from "react-helmet"
import PlayerSelector from "../elements/Player"
import Header from "../Header"
import { useEffect, useState } from "react";
import { Challenge, Player } from "../types/type";
import GridElement from "../elements/GridElement";
import jsonChallenges from "../data/challenges.json";

const initialChallenges: Challenge[][] = [[],[],[],[]];

const initialPlayers: Player[] = [
	{
		name: "Exemple 1",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	},
	{
		name: "Exemple 2",
		points: 0,
		bonus: 0,
		displayPoints: 0,
		lptPoints: 0
	}
]

function Egalite() {
	const [selectedPlayer, setSelectedPlayer] = useState<number>(-1);
	const [players, setPlayers] = useState<Player[]>(initialPlayers);
	const [challenges, setChallenges] = useState<Challenge[][]>(initialChallenges);

	useEffect(() => {
		const challengesList = jsonChallenges as {
			easy: Challenge[],
			medium: Challenge[],
			hard: Challenge[]
		}
		const template = (Math.random() >= 0.5) ? [[2,1,2,1],[1,3,2,1],[2,1,1,2],[1,2,2,3]] : [[2,1,2,1],[1,3,2,1],[2,1,1,3],[1,2,1,2]];
		const easyIndexes: number[] = []
		const mediumIndexes: number[] = []
		const hardIndexes: number[] = []
	
		for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
			for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
				const difficultyCase = template[rowIndex][columnIndex];
				let challengeIndex: number;
				
				switch (difficultyCase) {
					case 1:{
						do {
							challengeIndex = Math.floor(Math.random() * challengesList.easy.length);
						} while (easyIndexes.includes(challengeIndex));
						easyIndexes.push(challengeIndex);
						initialChallenges[rowIndex][columnIndex] = challengesList.easy[challengeIndex];
						break;
					}
					case 2:{
						do {
							challengeIndex = Math.floor(Math.random() * challengesList.medium.length);
						} while (mediumIndexes.includes(challengeIndex));
						mediumIndexes.push(challengeIndex);
						initialChallenges[rowIndex][columnIndex] = challengesList.medium[challengeIndex]
						break;
					}
					case 3:{
						do {
							challengeIndex = Math.floor(Math.random() * challengesList.hard.length);
						} while (hardIndexes.includes(challengeIndex));
						hardIndexes.push(challengeIndex);
						initialChallenges[rowIndex][columnIndex] = challengesList.hard[challengeIndex]
						break;
					}
				}
			}
		}
		setChallenges(initialChallenges);
	}, [])



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

	const checkPlayerWinRate = () => {
		for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {			
			let bonus = 0;
			for (let i = 0; i < 4; i++) {
				let verticalBonus = true;
				for (let j = 0; j < 4; j++) {
					if (challenges[i][j].completion[playerIndex]) {
						continue;
					}
					verticalBonus = false;
					break;
				}
				
				let horinzontalBonus = true;
				for (let j = 0; j < 4; j++) {
					if (challenges[j][i].completion[playerIndex]) {
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
				copy[playerIndex].lptPoints = bonus;
				copy[playerIndex].displayPoints = copy[playerIndex].points + 2*bonus
				return copy;
			});
		}
	}

	useEffect(() => {
		if (selectedPlayer === -1) return;
		checkPlayerWinRate();
	}, [challenges]);

	return (
		<>
			<Helmet>
                <title>LPT Bingo | Egalité</title>
			</Helmet>
			<Header/>

			<h1>Grille Egalité</h1>

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

export default Egalite
