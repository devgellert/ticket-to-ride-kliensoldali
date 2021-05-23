export const playerConstants = {
  SET_ACTIVE_PLAYER_INDEX: "SET_ACTIVE_PLAYER_INDEX",
  SET_PLAYERS: "SET_PLAYERS",
  CARD_DRAW_FROM_FIELD_SUCCESS: "CARD_DRAW_FROM_FIELD_SUCCESS",
  CARD_DRAW_FROM_DECK_SUCCESS: "CARD_DRAW_FROM_DECK_SUCCESS",
  PUSH_TO_BUILD_CONNECTION_IDS: "PUSH_TO_BUILD_CONNECTION_IDS",
  SET_ACTIVE_PLAYERS_CARDS: "SET_ACTIVE_PLAYERS_CARDS",
  FILTER_OUT_PLAYER_BY_SOCKET_ID: "FILTER_OUT_PLAYER_BY_SOCKET_ID",
};

const setActivePlayerIndex = (value) => ({
  type: playerConstants.SET_ACTIVE_PLAYER_INDEX,
  payload: {
    value,
  },
});

const filterOutPlayerBySocketId = (socketId) => ({
  type: playerConstants.FILTER_OUT_PLAYER_BY_SOCKET_ID,
  payload: {
    socketId,
  },
});

const setPlayers = (value) => ({
  type: playerConstants.SET_PLAYERS,
  payload: {
    value,
  },
});

const cardDrawFromFieldSuccess = ({ field, players, points, deck }) => ({
  type: playerConstants.CARD_DRAW_FROM_FIELD_SUCCESS,
  payload: {
    field,
    players,
    points,
    deck,
  },
});

const cardDrawFromDeckSuccess = ({ players, deck, log }) => ({
  type: playerConstants.CARD_DRAW_FROM_DECK_SUCCESS,
  payload: {
    players,
    deck,
    log,
  },
});

const pushToBuildConnectionIds = ({ id }) => ({
  type: playerConstants.PUSH_TO_BUILD_CONNECTION_IDS,
  payload: {
    id,
  },
});

const setActivePlayersCards = (cards) => ({
  type: playerConstants.SET_ACTIVE_PLAYERS_CARDS,
  payload: cards,
});

const playerActions = {
  setActivePlayerIndex,
  setPlayers,
  cardDrawFromFieldSuccess,
  cardDrawFromDeckSuccess,
  pushToBuildConnectionIds,
  setActivePlayersCards,
  filterOutPlayerBySocketId,
};

export default playerActions;
