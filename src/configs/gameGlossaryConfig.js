import { config as germsConfig } from "../gameGlossary/germs/main";
import { config as tomConfig } from "../gameGlossary/tom/main";
import { config as snowmanConfig } from "../gameGlossary/snowman/main";
import { config as emojiConfig } from "../gameGlossary/emoji/main";

export const gameGlossaryConfigs = {
  escapeFromGerms: {
    id: 0,
    name: "Escape form Germs",
    config: germsConfig,
  },
  tommyJumping: {
    id: 1,
    name: "Tommy Jumping",
    config: tomConfig,
  },
  snowmanDefender: {
    id: 2,
    name: "Snowman Defender",
    config: snowmanConfig,
  },
  emojiMatch: {
    id: 3,
    name: "Emoji Mathch",
    config: emojiConfig,
  },
};
