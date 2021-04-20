const getState = (state) => state.players;

const getPlayers = (state) => getState(state).players;

const getActivePlayerIndex = (state) => getState(state).activePlayerIndex;

const isPlayerIndexActive = (state, playerIndex) =>
  getActivePlayerIndex(state) === playerIndex;

const getPlayer = (state, id) => getPlayers(state)[id];

const getPlayerCards = (state, id) => getPlayerHand(state, id).cards;

const getPlayerDestinations = (state, id) =>
  getPlayerHand(state, id).destinations;

const getPlayerHand = (state, id) => getPlayer(state, id).hand;

const getActivePlayer = (state) =>
  getPlayer(state, getActivePlayerIndex(state));

const playersEssentialSelectors = {
  getPlayers,
  getActivePlayerIndex,
  getActivePlayer,
  isPlayerIndexActive,
  getPlayerDestinations,
  getPlayerCards,
};

export default playersEssentialSelectors;