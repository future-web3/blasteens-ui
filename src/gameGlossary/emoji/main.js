import Phaser from "phaser";
import Boot from "./Boot.js";
import Preloader from "./Preloader.js";
import MainMenu from "./MainMenu.js";
import MainGame from "./Game.js";

export const config = {
  title: "Emoji Match",
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#008eb0",
  parent: "game-glossary-frame",
  scene: [Boot, Preloader, MainMenu, MainGame],
};
