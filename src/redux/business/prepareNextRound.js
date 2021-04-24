import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import { prepareNextRoundSuccess } from "../actions";
import buildingEssentialSelectors from "../building/selectors/buildingEssentialSelectors";

const prepareNextRound = () => async (dispatch, getState) => {
  const state = getState();
  const activePlayerIndex = playersEssentialSelectors.getActivePlayerIndex(
    state
  );
  const playersLength = playersEssentialSelectors.getPlayersCount(state);

  const nextIndex =
    activePlayerIndex < playersLength - 1 ? activePlayerIndex + 1 : 0;

  const selectedCards = buildingEssentialSelectors.getSelectedCards(state);

  dispatch(
    prepareNextRoundSuccess({
      activePlayerIndex: nextIndex,
      prevActivePlayerIndex: activePlayerIndex,
      selectedCards,
    })
  );
};

export default prepareNextRound;
