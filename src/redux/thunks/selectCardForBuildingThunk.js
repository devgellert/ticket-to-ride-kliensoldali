import { compact, map } from "lodash";
//
import buildingEssentialSelectors from "../building/selectors/buildingEssentialSelectors";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";
import { selectCardForBuildingSuccess } from "../actions";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";

const selectCardForBuildingThunk = (type) => async (dispatch, getState) => {
  const state = getState();
  const selectedConnection = buildingEssentialSelectors.getSelectedConnection(
    state
  );
  if (!selectedConnection) return;
  const activePlayer = playersEssentialSelectors.getActivePlayer(state);
  const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
    state
  );
  let cardPicked = null;
  const newActivePlayerCards = compact(
    map(activePlayerCards, (card) => {
      if (card.type === type && cardPicked === null) {
        cardPicked = card;
        return null;
      }
      return card;
    })
  );
  if (cardPicked === null) throw new Error("No card in hand like this");

  dispatch(
    selectCardForBuildingSuccess(
      cardPicked,
      newActivePlayerCards,
      `${activePlayer.name}: ${cardPicked.type} kártya kiválasztva építkezéshez.`
    )
  );
};

export default selectCardForBuildingThunk;
