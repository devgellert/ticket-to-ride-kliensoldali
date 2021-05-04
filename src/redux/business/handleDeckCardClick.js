import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import playerActions from "../players/playersActions";
import roundActions from "../round/roundActions";

const handleDeckCardClick = () => async (dispatch, getState) => {
  const state = getState();

  const activePlayer = playersEssentialSelectors.getActivePlayer(state);

  const deck = [...generalEssentialSelectors.getDeck(state)];

  const firstElement = deck.pop();

  const players = [...playersEssentialSelectors.getPlayers(state)];

  if (!firstElement) return;

  players[
    playersEssentialSelectors.getActivePlayerIndex(state)
  ].hand.cards.push(firstElement);

  dispatch(playerActions.cardDrawFromDeckSuccess({ players, deck }));

  dispatch(
    roundActions.pushLog({
      value: `${activePlayer.name} húzott egy kártyát a pakliból`,
    })
  );
};

export default handleDeckCardClick;
