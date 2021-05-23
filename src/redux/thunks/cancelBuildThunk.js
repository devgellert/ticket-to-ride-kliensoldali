import buildingEssentialSelectors from "../building/selectors/buildingEssentialSelectors";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";
import buildingActions from "../building/buildingActions";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";

const cancelBuildThunk = () => async (dispatch, getState) => {
  const state = getState();
  const selectedCards = buildingEssentialSelectors.getSelectedCards(state);
  const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
    state
  );
  const newActivePlayerCards = [...activePlayerCards, ...selectedCards];
  const activePlayer = playersEssentialSelectors.getActivePlayer(state);

  dispatch(
    buildingActions.cancelBuildingSuccess({
      activePlayerCards: newActivePlayerCards,
      log: `${activePlayer.name}: mégsem építkezik`,
    })
  );
};

export default cancelBuildThunk;
