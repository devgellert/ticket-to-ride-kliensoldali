import { playerConstants } from "./playersActions";
import { PREPARE_NEXT_ROUND_SUCCESS } from "../constants";
import playersEssentialSelectors from "./selectors/playersEssentialSelectors";
import { map } from "lodash";

const initialState = {
  activePlayerIndex: 0,
  players: [
    {
      name: "Player 1",
      hand: {
        cards: [],
        destinations: [],
      },
      connectionIds: [],
    },
    {
      name: "Player 2",
      hand: {
        cards: [],
        destinations: [],
      },
      connectionIds: [],
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

    case playerConstants.CARD_DRAW_FROM_FIELD_SUCCESS:
      return {
        ...state,
        players: action.payload.players,
      };

    case PREPARE_NEXT_ROUND_SUCCESS:
      return {
        ...state,
        activePlayerIndex: action.payload.activePlayerIndex,
      };

    case playerConstants.PUSH_TO_BUILD_CONNECTION_IDS:
      const activeIndex = state.activePlayerIndex;

      const newPlayers = [...state.players];
      newPlayers[activeIndex].connectionIds.push(action.payload.id);

      return {
        ...state,
        players: newPlayers,
      };

    case playerConstants.SET_ACTIVE_PLAYERS_CARDS:
      return {
        ...state,
        players: map(state.players, (player, index) =>
          index !== state.activePlayerIndex
            ? player
            : {
                ...player,
                hand: {
                  ...player.hand,
                  cards: action.payload,
                },
              }
        ),
      };

    default:
      return state;
  }
};

export default playersReducer;
