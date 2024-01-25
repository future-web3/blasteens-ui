import { Outlet, Link, useParams } from "react-router-dom";
import styles from "./GameView.module.scss";
import React from "react";
import gameGlossaryConfigs from "../../configs/gameGlossaryConfigs";

let game = null;

function GameView() {
  const { gameId } = useParams();

  const targetGame = gameGlossaryConfigs[gameId];

  console.log(targetGame);

  return (
    <div>
      {targetGame.name}
      <div id="game-glossary-frame"></div>
    </div>
  );
}
export default GameView;
