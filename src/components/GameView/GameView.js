import { Outlet, Link, useParams } from "react-router-dom";
import styles from "./GameView.module.scss";
import React, { useEffect } from "react";
import { gameGlossaryConfigs } from "../../configs/gameGlossaryConfig";
import Phaser from "phaser";

let game = null;

function GameView() {
  const { gameId } = useParams();

  const targetGame = gameGlossaryConfigs[`${gameId}`];

  if (!targetGame) {
    return null;
  }

  game = new Phaser.Game(targetGame.config);

  return (
    <div>
      {targetGame.name}
      <div id="game-glossary-frame"></div>
    </div>
  );
}
export default GameView;
