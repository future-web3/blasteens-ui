import { config as germsConfig } from "../gameGlossary/germs/main";
import { config as tomConfig } from "../gameGlossary/tom/main";
import { config as snowmanConfig } from "../gameGlossary/snowman/main";
import { config as emojiConfig } from "../gameGlossary/emoji/main";

export const gameConfigs = {
  escapeFromGerms: {
    id: 0,
    key: "germs",
    name: "Escape from Germs",
    description:
      "Navigate through a virtual world while avoiding and escaping from germs. Test your reflexes and strategic thinking in this exciting game.",
    config: germsConfig,
    category: "game-glossary",
  },
  tommyJumping: {
    id: 1,
    key: "tom",
    name: "Tommy Jumping",
    description:
      "Join Tommy in an adventurous jumping game. Help him overcome obstacles and reach new heights. How far can you guide Tommy in this endless jumping journey?",
    config: tomConfig,
    category: "game-glossary",
  },
  snowmanDefender: {
    id: 2,
    key: "snowman",
    name: "Snowman Defender",
    description:
      "Defend your snowman against waves of attackers. Utilize various defenses and power-ups to keep your snowman safe. A thrilling defense game set in a winter wonderland.",
    config: snowmanConfig,
    category: "game-glossary",
  },
  emojiMatch: {
    id: 3,
    key: "emoji",
    name: "Emoji Match",
    description:
      "Exercise your memory and matching skills in the Emoji Match game. Flip cards to find matching emoji pairs within the given time. How quickly can you match them all?",
    config: emojiConfig,
    category: "game-glossary",
  },
  cryptoDungeon: {
    id: 4,
    key: "dungeon",
    name: "Crypto Dungeon",
    description:
      "Exercise your memory and matching skills in the Emoji Match game. Flip cards to find matching emoji pairs within the given time. How quickly can you match them all?",
    category: "indieg-game",
  },
};
