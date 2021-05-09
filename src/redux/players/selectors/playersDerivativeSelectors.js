import { cardTypes } from "../../general/generalReducer";
import { forEach, map, flatten, includes } from "lodash";
import playersEssentialSelectors from "./playersEssentialSelectors";
import mapConnectionLengthToPoints from "../../../utils/mapConnectionLengthToPoints";
import buildingEssentialSelectors from "../../building/selectors/buildingEssentialSelectors";
import roundEssentialSelectors from "../../round/selectors/roundEssentialSelectors";
import { reduce, size } from "lodash";
import GraphModel from "../../../services/GraphModel";

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
    const { hand, connections } = player;

    const isActive = isPlayerIndexActive(state, index);
    const points = getPlayerRoutePoints(state, index);
    const isPlayerActive =
      index === playersEssentialSelectors.getActivePlayerIndex(state);
    const cards =
      hand.cards.length +
      (isPlayerActive
        ? buildingEssentialSelectors.getSelectedCards(state).length
        : 0);

    const vagons = getPlayerAvailableVagons(state, index);

    const round = roundEssentialSelectors.getNth(state);

    return {
      destinations: hand.destinations.length,
      cards,
      name: player.name,
      points: points,
      round,
      vagons,
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
  let result = 10;

  const connections = getPlayerConnections(state, playerIndex);

  forEach(connections, (connection) => {
    result -= connection.elements.length;
  });

  return result;
};

const getActivePlayerAvailableVagons = (state) => {
  const index = playersEssentialSelectors.getActivePlayerIndex(state);
  return getPlayerAvailableVagons(state, index);
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

const getPlayerDestinationPoints = (state, playerIndex) => {
  const connections = getPlayerConnections(state, playerIndex);
  const destinations = getPlayerDestinations(state, playerIndex);
  const formattedConnections = reduce(
    connections,
    (acc, elem) => [
      ...(acc || []),
      {
        from: Number(elem.from),
        to: Number(elem.to),
      },
      {
        from: Number(elem.to),
        to: Number(elem.from),
      },
    ],
    []
  );

  let result = 0;
  forEach(destinations, (destination) => {
    const graphModel = new GraphModel(formattedConnections);

    const isConnected = graphModel.areVertexesConnected(
      destination.from,
      destination.to
    );

    if (isConnected) {
      result += Number(destination.value);
    }
  });

  return result;
};

const getFinalStatistics = (state) => {
  const players = playersEssentialSelectors.getPlayers(state);

  const statistics = map(players, (player, index) => {
    const routePoints = getPlayerRoutePoints(state, index);
    const destinationPoints = getPlayerDestinationPoints(state, index);
    const allPoints = routePoints + destinationPoints;

    return {
      index,
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

const getFinalDestinationConnections = (state) => {
  const destinations = [];
  for (let player of playersEssentialSelectors.getPlayers(state)) {
    destinations.push({
      destinations: player.hand.destinations,
      connections: player.connections,
    });
  }
  return destinations;
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
  getFinalDestinationConnections,
  getPlayerAvailableVagons,
  getActivePlayerAvailableVagons
};

export default playersDerivativeSelectors;
