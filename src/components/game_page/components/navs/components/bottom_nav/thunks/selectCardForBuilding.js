import buildingEssentialSelectors from "../../../../../../../redux/building/selectors/buildingEssentialSelectors";
import playersDerivativeSelectors from "../../../../../../../redux/players/selectors/playersDerivativeSelectors";
import { compact, map } from "lodash";
import buildingActions from "../../../../../../../redux/building/buildingActions";
import playerActions from "../../../../../../../redux/players/playersActions";

const selectCardForBuilding = (type) => async (dispatch, getState) => {
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

export default selectCardForBuilding;
