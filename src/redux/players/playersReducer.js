import { playerConstants } from "./playersActions";
import playersEssentialSelectors from "./selectors/playersEssentialSelectors";
import { map } from "lodash";

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
      const players = map(action.payload.prevPlayers, (player, index) => {
        if (!playersEssentialSelectors.isPlayerIndexActive(index))
          return player;

        return {
          ...player,
          hand: {
            ...player.hand,
            cards: [...player.hand, action.payload.card],
          },
        };
      });

      return {
        ...state,
        players,
      };

    default:
      return state;
  }
};

export default playersReducer;
