import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";
import playerActions from "../players/playersActions";

const buildConnection = (id) => async (dispatch, getState) => {
  dispatch(playerActions.pushToBuildConnectionIds({ id }));
};

export default buildConnection;
