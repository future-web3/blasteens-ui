import Phaser from "phaser";
import Boot from "./Boot.js";
import Preloader from "./Preloader.js";
import MainMenu from "./MainMenu.js";
import MainGame from "./Game.js";

export const config = {
  title: "Snowman Defender",
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: "#3366b2",
  parent: "game-glossary-frame",
  scene: [Boot, Preloader, MainMenu, MainGame],
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
};
