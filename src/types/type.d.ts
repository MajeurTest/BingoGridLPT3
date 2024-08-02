type Challenge = {
	points: Difficulty,
	content: string,
	completion: [boolean, boolean, boolean, boolean]
}

type Difficulty = 1 | 2 | 3

type Player = {
	name: string,
	points: number,
	bonus: number,
	displayPoints: number,
	lptPoints: number
}

export type {
	Challenge,
	Player
}