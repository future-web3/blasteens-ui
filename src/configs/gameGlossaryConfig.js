import { config as germsConfig } from "../gameGlossary/germs/main";
import { config as tomConfig } from "../gameGlossary/tom/main";
import { config as snowmanConfig } from "../gameGlossary/snowman/main";
import { config as emojiConfig } from "../gameGlossary/emoji/main";

export const gameGlossaryConfigs = {
  escapeFromGerms: {
    id: 0,
    key: "germs",
    name: "Escape form Germs",
    config: germsConfig,
  },
  tommyJumping: {
    id: 1,
    key: "tom",
    name: "Tommy Jumping",
    config: tomConfig,
  },
  snowmanDefender: {
    id: 2,
    key: "snowman",
    name: "Snowman Defender",
    config: snowmanConfig,
  },
  emojiMatch: {
    id: 3,
    key: "emoji",
    name: "Emoji Match",
    config: emojiConfig,
  },
};
