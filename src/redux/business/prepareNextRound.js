import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import { prepareNextRoundSuccess } from "../actions";

const prepareNextRound = () => async (dispatch, getState) => {
  const state = getState();
  const activePlayerIndex = playersEssentialSelectors.getActivePlayerIndex(
    state
  );
  const playersLength = playersEssentialSelectors.getPlayersCount(state);

  const nextIndex =
    activePlayerIndex < playersLength - 1 ? activePlayerIndex + 1 : 0;

  dispatch(prepareNextRoundSuccess({ activePlayerIndex: nextIndex }));
};

export default prepareNextRound;
