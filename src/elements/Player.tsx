import { memo } from "react";
import { Player } from "../types/type";

function PlayerSelector(props: Readonly<{player: Player, onClickEvent: React.MouseEventHandler<HTMLDivElement>, isSelected: boolean, playerIndex: number}>) {


	return (
		<div className={"joueur " + (props.isSelected ? "selected" : "")} onClick={props.onClickEvent}>
			<div className="playerName">{props.player.name}</div>
			<div className={"playerIndicator indicatorPlayer" + props.playerIndex }></div>
			<div className="playerPoints">{props.player.displayPoints} {"(" + props.player.lptPoints + ")"}</div>
		</div>
	)
}

export default memo(PlayerSelector)