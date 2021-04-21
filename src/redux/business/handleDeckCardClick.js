import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import { map } from "lodash";
import playerActions from "../players/playersActions";

const handleDeckCardClick = () => async (dispatch, getState) => {
  const state = getState();

  const deck = [...generalEssentialSelectors.getDeck(state)];

  const firstElement = deck.pop();

  const players = [...playersEssentialSelectors.getPlayers(state)];

  players[
    playersEssentialSelectors.getActivePlayerIndex(state)
  ].hand.cards.push(firstElement);

  dispatch(playerActions.cardDrawFromDeckSuccess({ players }));
};

export default handleDeckCardClick;
