import GraphModel from "../../services/GraphModel";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import buildingActions from "../building/buildingActions";

const showHoveredDestinationThunk = (fromId, toId) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const activePlayerConnections = playersEssentialSelectors.getActivePlayerConnections(
    state
  );

  const connections = GraphModel.createUndirectedFromDirectedData(
    activePlayerConnections
  );
  const graphModel = new GraphModel(connections);

  const connectionIds = graphModel.getPath(fromId, toId);
  dispatch(
    buildingActions.setHover({
      from: fromId,
      to: toId,
      connectionIds,
    })
  );
};

export default showHoveredDestinationThunk;
