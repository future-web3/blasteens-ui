import Phaser from "phaser";
import Preloader from "./Preloader.js";
import Play from "./Play.js";
import Menu from "./Menu.js";
import UI from "./UI.js";

export const config = {
  title: "Tommy Jumping",
  type: Phaser.AUTO,
  parent: "game-glossary-frame",
  width: 640,
  height: 360,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 2000,
      },
    },
  },
  scene: [Preloader, UI, Play, Menu],
};
