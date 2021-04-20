import { cardTypes } from "../general/generalReducer";
import { forEach, compact } from "lodash";

const getState = (state) => state.players;

const getPlayers = (state) => getState(state).players;

const getActivePlayerIndex = (state) => getState(state).activePlayerIndex;

const getActivePlayer = (state) =>
  getState(state).players[getState(state).activePlayerIndex];

const getPlayerCardTypeNumbers = (state, playerIndex) => {
  const playersState = getState(state);

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
};

export default playersSelectors;
