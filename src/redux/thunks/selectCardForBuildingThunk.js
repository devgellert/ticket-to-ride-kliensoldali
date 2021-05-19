import { compact, map } from "lodash";
//
import buildingEssentialSelectors from "../building/selectors/buildingEssentialSelectors";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";
import buildingActions from "../building/buildingActions";
import playerActions from "../players/playersActions";

const selectCardForBuildingThunk = (type) => async (dispatch, getState) => {
  const state = getState();
  const selectedConnection = buildingEssentialSelectors.getSelectedConnection(
    state
  );
  if (!selectedConnection) return;

  const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
    state
  );
  let cardPicker = null;
  const newActivePlayerCards = compact(
    map(activePlayerCards, (card) => {
      if (card.type === type && cardPicker === null) {
        cardPicker = card;
        return null;
      }
      return card;
    })
  );
  if (cardPicker === null) throw new Error("No card in hand like this");

  dispatch(buildingActions.pushSelectedCard(cardPicker));
  dispatch(playerActions.setActivePlayersCards(newActivePlayerCards));
};

export default selectCardForBuildingThunk;
