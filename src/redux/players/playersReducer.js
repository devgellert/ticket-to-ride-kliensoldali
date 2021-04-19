import { playerConstants } from "./playersActions";

const initialState = {
  activePlayerIndex: 0,
  players: [
    {
      name: "Player 1",
      hand: {
        cards: {},
        aims: [],
      },
    },
    {
      name: "Player 2",
      hand: {
        cards: {},
        aims: [],
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

    default:
      return state;
  }
};

export default playersReducer;
