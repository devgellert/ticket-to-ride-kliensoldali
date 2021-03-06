import { map } from "lodash";
import { playerConstants } from "./playersActions";
import {
  BUILD_SUCCESS,
  CARD_DRAW_FROM_FIELD_SUCCESS,
  INIT_GAME_SUCCESS,
  JOIN_SUCCESS,
  PREPARE_NEXT_ROUND_SUCCESS,
  SELECT_CARD_FOR_BUILDING_SUCCESS,
  SYNC_STATE,
  UNSELECT_CARD_SUCCESS,
} from "../constants";
import { buildingConstants } from "../building/buildingActions";
import playersEssentialSelectors from "./selectors/playersEssentialSelectors";

const initialState = {
  activePlayerIndex: 0,
  players: [],
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYNC_STATE:
      return {
        ...playersEssentialSelectors.getState(action.payload.state),
      };

    case playerConstants.FILTER_OUT_PLAYER_BY_SOCKET_ID:
      return {
        ...state,
        players: state.players.filter(
          (player) => player.socketId !== action.payload.socketId
        ),
      };
    case playerConstants.SET_ACTIVE_PLAYER_INDEX:
      return {
        ...state,
        activePlayerIndex: action.payload.value,
      };

    // TODO delete if not used
    case playerConstants.SET_PLAYERS:
      return {
        ...state,
        players: action.payload.value,
      };

    case INIT_GAME_SUCCESS:
      return {
        ...state,
        players: action.payload.players,
      };

    case CARD_DRAW_FROM_FIELD_SUCCESS:
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

    case SELECT_CARD_FOR_BUILDING_SUCCESS:
      return {
        ...state,
        players: map(state.players, (player, index) =>
          index !== state.activePlayerIndex
            ? player
            : {
                ...player,
                hand: {
                  ...player.hand,
                  cards: action.payload.cards,
                },
              }
        ),
      };

    case BUILD_SUCCESS:
      return {
        ...state,
        players: map(state.players, (player, index) =>
          index === state.activePlayerIndex
            ? {
                ...player,
                connections: [
                  ...player.connections,
                  action.payload.selectedConnection,
                ],
                hand: {
                  ...player.hand,
                  cards: [
                    ...player.hand.cards,
                    ...action.payload.cardsToPutBackToHand,
                  ],
                },
              }
            : player
        ),
      };

    case buildingConstants.CANCEL_BUILDING_SUCCESS:
      return {
        ...state,
        players: map(state.players, (player, index) => {
          if (index === state.activePlayerIndex) {
            return {
              ...player,
              hand: {
                ...player.hand,
                cards: action.payload.activePlayerCards,
              },
            };
          }
          return player;
        }),
      };

    case UNSELECT_CARD_SUCCESS:
      return {
        ...state,
        players: map(state.players, (player, index) => {
          if (index === state.activePlayerIndex) {
            return {
              ...player,
              hand: {
                ...player.hand,
                cards: action.payload.activePlayerCards,
              },
            };
          }
          return player;
        }),
      };

    case JOIN_SUCCESS:
      return {
        ...state,
        players: action.payload.players,
      };

    default:
      return state;
  }
};

export default playersReducer;
