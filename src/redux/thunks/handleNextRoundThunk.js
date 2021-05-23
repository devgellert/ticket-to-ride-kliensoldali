import prepareNextRoundThunk from "./prepareNextRoundThunk";
import roundActions from "../round/roundActions";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import wait from "./helpers/wait";

const handleNextRoundThunk = () => async (dispatch, getState) => {
  const state = getState();

  dispatch(prepareNextRoundThunk());

  await wait(500);

  const isLastRoundNeeded = playersDerivativeSelectors.getIsLastRoundNeeded(
    state
  );
  const players = playersEssentialSelectors.getPlayers(state);

  if (isLastRoundNeeded) {
    dispatch(roundActions.setLastRoundsCount({ value: players.length }));
  }
};

export default handleNextRoundThunk;
