import { cardTypes } from "../general/generalReducer";
import { forEach, map } from "lodash";

const getState = (state) => state.players;

const getPlayers = (state) => getState(state).players;

const getPlayersStatistics = (state) => {
  const players = getState(state).players;

  return map(players, (player) => {
    const hand = player.hand;

    return {
      destinations: hand.destinations.length,
      cards: hand.cards.length,
      name: player.name,
      points: player.points ?? 0,
      round: "TODO",
      vagons: "TODO",
    };
  });
};

const getPlayer = (state, id) => getState(state).players[id];

const getPlayerHand = (state, id) => getPlayer(state, id).hand;

const getPlayerDestinations = (state, id) =>
  getPlayerHand(state, id).destinations;

const getActivePlayerDestinations = (state) => {
  const index = getActivePlayerIndex(state);

  return getPlayerDestinations(state, index);
};

const getPlayerCards = (state, id) => getPlayerHand(state, id).cards;

const getActivePlayerIndex = (state) => getState(state).activePlayerIndex;

const getActivePlayer = (state) =>
  getState(state).players[getState(state).activePlayerIndex];

const getPlayerCardTypeNumbers = (state, playerIndex) => {
  const playersState = getState(state); // TODO use getPlayer

  const player = playersState.players[playerIndex];

  const playerCards = player.hand.cards;

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

const playersSelectors = {
  getPlayers,
  getActivePlayerIndex,
  getActivePlayer,
  getActivePlayerCardTypeNumbers,
  getActivePlayerDestinations,
  getPlayersStatistics,
};

export default playersSelectors;
