import { forEach, unset } from "lodash";
import { cardTypes } from "../../../redux/general/generalReducer";

const getNormalizedDeck = (deck) => {
  const res = { ...deck };

  forEach(cardTypes, (color) => {
    if (res[color] !== 0) return;
    unset(res, color);
  });

  return res;
};

export default getNormalizedDeck;
