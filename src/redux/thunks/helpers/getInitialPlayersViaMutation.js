import { map } from "lodash";
import getInitialPlayerCardsViaMutation from "./getInitialPlayerCardsViaMutation";
import getInitialDestinationsViaMutation from "./getInitialDestinationsViaMutation";

const getInitialPlayersViaMutation = (deck, destinations, players) =>
  map(players, (player) => ({
    ...player,
    hand: {
      cards: getInitialPlayerCardsViaMutation(deck),
      destinations: getInitialDestinationsViaMutation(destinations),
    },
  }));

export default getInitialPlayersViaMutation;
