export const playerConstants = {
  SET_ACTIVE_PLAYER_INDEX: "SET_ACTIVE_PLAYER_INDEX",
  SET_PLAYERS: "SET_PLAYERS",
  CARD_DRAW_SUCCESS: "CARD_DRAW_SUCCESS",
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

const cardDrawSuccess = ({ field, players }) => ({
  type: playerConstants.CARD_DRAW_SUCCESS,
  payload: {
    field,
    players,
  },
});

const playerActions = {
  setActivePlayerIndex,
  setPlayers,
  cardDrawSuccess,
};

export default playerActions;
