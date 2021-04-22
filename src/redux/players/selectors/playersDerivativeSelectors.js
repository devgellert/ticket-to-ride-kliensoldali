import { cardTypes } from "../../general/generalReducer";
import { forEach, map, flatten } from "lodash";
import playersEssentialSelectors from "./playersEssentialSelectors";

const {
  getActivePlayerIndex,
  getPlayers,
  isPlayerIndexActive,
  getPlayerDestinations,
  getPlayerCards,
  getMode,
} = playersEssentialSelectors;

const getPlayersStatistics = (state) => {
  const players = getPlayers(state);

  return map(players, (player, index) => {
    const { hand } = player;

    const isActive = isPlayerIndexActive(state, index);

    return {
      destinations: hand.destinations.length,
      cards: hand.cards.length,
      name: player.name,
      points: player.points ?? 0,
      round: "TODO",
      vagons: "TODO",
      isActive,
    };
  });
};

const getActivePlayerDestinations = (state) => {
  const index = getActivePlayerIndex(state);
  return getPlayerDestinations(state, index);
};

const getPlayerCardTypeNumbers = (state, playerIndex) => {
  const playerCards = getPlayerCards(state, playerIndex);

  const cardTypeNumbers = {};

  forEach(cardTypes, (type) => {
    let count = 0;
    forEach(playerCards, (card) => {
      if (card.type === type) {
        count++;
      }
    });
    cardTypeNumbers[type] = count;
  });

  return cardTypeNumbers;
};

const getActivePlayerCardTypeNumbers = (state) => {
  const activePlayerIndex = getActivePlayerIndex(state);
  return getPlayerCardTypeNumbers(state, activePlayerIndex);
};

const getAllBuiltConnectionIds = (state) => {
  const players = getPlayers(state);
  return flatten(map(players, (player) => player.connectionIds));
};

const getIsConnectionBuilt = (state, id) =>
  getAllBuiltConnectionIds(state).includes(id);

const activePlayerHasEnoughCards = (state) => {
  // const activePlayerIndex = state.activePlayerIndex;
  // const player = state.players[activePlayerIndex];

  return false;
};

const playersDerivativeSelectors = {
  getActivePlayerCardTypeNumbers,
  getActivePlayerDestinations,
  getPlayersStatistics,
  getIsConnectionBuilt,
  activePlayerHasEnoughCards,
};

export default playersDerivativeSelectors;
