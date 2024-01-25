import Phaser from "phaser";
import Boot from "./Boot.js";
import Preloader from "./Preloader.js";
import MainMenu from "./MainMenu.js";
import MainGame from "./Game.js";

export const germsConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  parent: "game-glossary-frame",
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  scene: [Boot, Preloader, MainMenu, MainGame],
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
};
