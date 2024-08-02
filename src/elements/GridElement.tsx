import { MouseEventHandler } from "react";
import { Challenge } from "../types/type"

const GridElement = (props: Readonly<{challenge: Challenge, onClickEvent: MouseEventHandler<HTMLDivElement>}>) => {
	let color = "";
	switch (props.challenge.points) {
		case 1: {
			color = "easy";
			break;
		}
		case 2: {
			color = "medium";
			break;
		}
		case 3: {
			color = "hard";
			break;
		}
	}

	const playersIndicators : JSX.Element[] = [];
	props.challenge.completion.forEach((didPlayerComplete, index) => {
		playersIndicators[index] = didPlayerComplete ? (<div className={"indicatorPlayer" + index }></div>) : (<div className="blankIndicator"></div>)
	});
	
	const playerIndicatorDisplay = <>
		{playersIndicators[0]}
		{playersIndicators[1]}
		{playersIndicators[2]}
		{playersIndicators[3]}
	</>

	return (
		<div onClick={props.onClickEvent}>
			<div className={color}>
				{props.challenge.content}
			</div>
			<div className="playersIndicators">
				{playerIndicatorDisplay}
			</div>
		</div>
	)
}

export default GridElement