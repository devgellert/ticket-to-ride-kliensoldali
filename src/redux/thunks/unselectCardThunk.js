import { filter, find } from "lodash";
//
import buildingEssentialSelectors from "../building/selectors/buildingEssentialSelectors";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";
import buildingActions from "../building/buildingActions";

const unselectCardThunk = (type) => async (dispatch, getState) => {
  const state = getState();
  const selectedCards = buildingEssentialSelectors.getSelectedCards(state);
  const cardToUnselect = find(selectedCards, (card) => card.type === type);

  if (!cardToUnselect) throw new Error("No card found");

  const newSelectedCards = filter(
    selectedCards,
    (card) => card.id !== cardToUnselect.id
  );

  const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
    state
  );

  const newActivePlayerCards = [...activePlayerCards, cardToUnselect];

  dispatch(
    buildingActions.unselectCardSuccess({
      activePlayerCards: newActivePlayerCards,
      selectedCards: newSelectedCards,
    })
  );
};

export default unselectCardThunk;
