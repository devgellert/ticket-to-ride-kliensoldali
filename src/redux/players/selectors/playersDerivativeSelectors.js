import { cardTypes } from "../../general/generalReducer";
import { forEach, map, flatten, includes } from "lodash";
import playersEssentialSelectors from "./playersEssentialSelectors";
import mapConnectionLengthToPoints from "../../../utils/mapConnectionLengthToPoints";
import buildingEssentialSelectors from "../../building/selectors/buildingEssentialSelectors";
import roundEssentialSelectors from "../../round/selectors/roundEssentialSelectors";
import React from "react";

const {
  getActivePlayerIndex,
  getPlayers,
  isPlayerIndexActive,
  getPlayerDestinations,
  getPlayerCards,
  getPlayerConnections,
  getPlayer,
} = playersEssentialSelectors;

const getPlayersStatistics = (state) => {
  const players = getPlayers(state);

  return map(players, (player, index) => {
    const { hand } = player;

    const isActive = isPlayerIndexActive(state, index);
    const points = getPlayerRoutePoints(state, index);
    const isPlayerActive =
      index === playersEssentialSelectors.getActivePlayerIndex(state);
    const cards =
      hand.cards.length +
      (isPlayerActive
        ? buildingEssentialSelectors.getSelectedCards(state).length
        : 0);

    return {
      destinations: hand.destinations.length,
      cards,
      name: player.name,
      points: points,
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

const getActivePlayerCards = (state) => {
  const index = getActivePlayerIndex(state);
  return getPlayerCards(state, index);
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

const getAllBuiltConnections = (state) => {
  const players = getPlayers(state);
  return flatten(map(players, (player) => player.connections));
};

const getIsConnectionBuilt = (state, id) =>
  includes(
    map(getAllBuiltConnections(state), (elem) => elem.id),
    id
  );

const activePlayerHasEnoughCards = (state) => {
  // const activePlayerIndex = state.activePlayerIndex;
  // const player = state.players[activePlayerIndex];

  return false;
};

const getPlayerRoutePoints = (state, playerIndex) => {
  const connections = getPlayerConnections(state, playerIndex);
  let result = 0;
  forEach(connections, (connection) => {
    result += mapConnectionLengthToPoints[connection.elements.length];
  });

  return result;
};

const getPlayerAvailableVagons = (state, playerIndex) => {
  let result = 5; // TODO 45

  const connections = getPlayerConnections(state, playerIndex);

  forEach(connections, (connection) => {
    result -= connection.elements.length;
  });

  return result;
};

const getIsLastRoundNeeded = (state) => {
  const playerCount = playersEssentialSelectors.getPlayers(state).length;
  const lastRoundsCount = roundEssentialSelectors.getLastRoundsCount(state);

  if (lastRoundsCount !== null) return false; // If already sat, dont need to set anymore

  for (let i = 0; i < playerCount; i++) {
    const isLastRoundNeeded = getPlayerAvailableVagons(state, i) <= 2;
    if (isLastRoundNeeded) {
      return true;
    }
  }

  return false;
};

const getFinalStatistics = (state) => {
  const players = playersEssentialSelectors.getPlayers(state);

  const statistics = map(players, (player, index) => {
    const routePoints = getPlayerRoutePoints(state, index);
    const destinationPoints = 0;
    const allPoints = routePoints + destinationPoints;

    return {
      name: player.name,
      routePoints,
      destinationPoints,
      allPoints,
    };
  });

  const statisticsInOrder = statistics.sort(
    (a, b) => b.allPoints - a.allPoints // desc
  );

  return statisticsInOrder;
};

const playersDerivativeSelectors = {
  getActivePlayerCardTypeNumbers,
  getActivePlayerDestinations,
  getPlayersStatistics,
  getIsConnectionBuilt,
  activePlayerHasEnoughCards,
  getActivePlayerCards,
  getPlayerRoutePoints,
  getIsLastRoundNeeded,
  getFinalStatistics,
};

export default playersDerivativeSelectors;
