import buildingEssentialSelectors from "../building/selectors/buildingEssentialSelectors";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";
import buildingActions from "../building/buildingActions";

const cancelBuildThunk = () => async (dispatch, getState) => {
  const state = getState();
  const selectedCards = buildingEssentialSelectors.getSelectedCards(state);
  const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
    state
  );
  const newActivePlayerCards = [...activePlayerCards, ...selectedCards];

  dispatch(
    buildingActions.cancelBuildingSuccess({
      activePlayerCards: newActivePlayerCards,
    })
  );
};

export default cancelBuildThunk;
