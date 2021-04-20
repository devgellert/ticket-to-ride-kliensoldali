import { forEach, keys } from "lodash";
import shuffle from "../../../utils/shuffle";

const createInitialDeck = () => {
  const typeToCountMap = {
    purple: 12,
    white: 12,
    blue: 12,
    yellow: 12,
    orange: 12,
    black: 12,
    red: 12,
    green: 12,
    locomotive: 14,
  };

  const result = [];
  const deckKeys = keys(typeToCountMap);

  forEach(deckKeys, (key) => {
    for (let i = 0; i < typeToCountMap[key]; i++) {
      result.push({
        type: key,
        id: `${key}-${i}`,
      });
    }
  });

  return shuffle(result);
};

export default createInitialDeck;
