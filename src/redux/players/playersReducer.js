import { playerConstants } from "./playersActions";

const initialState = {
  activePlayerIndex: 0,
  mode: null, // draw || build || null
  players: [
    {
      name: "Player 1",
      hand: {
        cards: [],
        destinations: [],
      },
    },
    {
      name: "Player 2",
      hand: {
        cards: [],
        destinations: [],
      },
    },
  ],
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case playerConstants.SET_ACTIVE_PLAYER_INDEX:
      return {
        ...state,
        activePlayerIndex: action.payload.value,
      };

    case playerConstants.SET_PLAYERS:
      return {
        ...state,
        players: action.payload.value,
      };

    case playerConstants.CARD_DRAW_SUCCESS:
      return {
        ...state,
        players: action.payload.players,
      };

    default:
      return state;
  }
};

export default playersReducer;
