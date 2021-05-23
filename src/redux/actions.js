import {
  SET_BUILD_CONNECTION_IDS,
  SET_LOCOMOTIVE_FIELD,
  SYNC_STATE,
  SET_PLAYER_HAND,
  PREPARE_NEXT_ROUND_SUCCESS,
  BUILD_SUCCESS,
  SELECT_CARD_FOR_BUILDING_SUCCESS,
  INIT_GAME_SUCCESS,
  UNSELECT_CARD_SUCCESS,
  CARD_DRAW_FROM_FIELD_SUCCESS,
  JOIN_SUCCESS,
} from "./constants";

export const selectCardForBuildingSuccess = (card, cards, log) => ({
  type: SELECT_CARD_FOR_BUILDING_SUCCESS,
  payload: {
    card,
    cards,
    log,
  },
});

export const syncState = (state) => ({
  type: SYNC_STATE,
  payload: {
    state,
  },
  disableSync: true,
});

export const setLocomotiveField = (value) => ({
  type: SET_LOCOMOTIVE_FIELD,
  payload: {
    value,
  },
});

export const setPlayerHand = (value) => ({
  type: SET_PLAYER_HAND,
  payload: {
    value,
  },
});

export const setBuildConnectionIds = (value) => ({
  type: SET_BUILD_CONNECTION_IDS,
  payload: {
    value,
  },
});

export const prepareNextRoundSuccess = ({ activePlayerIndex, log }) => ({
  type: PREPARE_NEXT_ROUND_SUCCESS,
  payload: {
    activePlayerIndex,
    log,
  },
});

export const buildSuccess = ({
  cardsToPutBackToHand,
  selectedConnection,
  log,
}) => ({
  type: BUILD_SUCCESS,
  payload: {
    cardsToPutBackToHand,
    selectedConnection,
    log,
  },
});

export const initGameSuccess = ({
  players,
  deck,
  field,
  log,
  destinations,
}) => ({
  type: INIT_GAME_SUCCESS,
  payload: {
    players,
    deck,
    field,
    log,
    destinations,
  },
});

export const unselectCardSuccess = ({
  selectedCards,
  activePlayerCards,
  log,
}) => ({
  type: UNSELECT_CARD_SUCCESS,
  payload: {
    selectedCards,
    activePlayerCards,
    log,
  },
});

export const cardDrawFromFieldSuccess = ({
  field,
  players,
  points,
  deck,
  log,
}) => ({
  type: CARD_DRAW_FROM_FIELD_SUCCESS,
  payload: { field, players, points, deck, log },
});

export const joinSuccess = ({ players, destinations, deck }) => ({
  type: JOIN_SUCCESS,
  payload: {
    players,
    destinations,
    deck,
  },
});
