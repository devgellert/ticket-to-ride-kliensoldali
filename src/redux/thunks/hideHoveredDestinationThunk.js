import buildingActions from "../building/buildingActions";

const hideHoveredDestinationThunk = () => async (dispatch) =>
  dispatch(
    buildingActions.setHover({
      from: null,
      to: null,
      connectionIds: [],
    })
  );

export default hideHoveredDestinationThunk;
