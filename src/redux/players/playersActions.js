export const playerConstants = {
  SET_ACTIVE_PLAYER_INDEX: "SET_ACTIVE_PLAYER_INDEX",
  SET_PLAYERS: "SET_PLAYERS",
  CARD_DRAW_FROM_FIELD_SUCCESS: "CARD_DRAW_FROM_FIELD_SUCCESS",
  CARD_DRAW_FROM_DECK_SUCCESS: "CARD_DRAW_FROM_DECK_SUCCESS",
};

const setActivePlayerIndex = (value) => ({
  type: playerConstants.SET_ACTIVE_PLAYER_INDEX,
  payload: {
    value,
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

const cardDrawFromDeckSuccess = ({ players }) => ({
  type: playerConstants.CARD_DRAW_FROM_DECK_SUCCESS,
  payload: {
    players,
  },
});

const playerActions = {
  setActivePlayerIndex,
  setPlayers,
  cardDrawFromFieldSuccess,
  cardDrawFromDeckSuccess,
};

export default playerActions;
