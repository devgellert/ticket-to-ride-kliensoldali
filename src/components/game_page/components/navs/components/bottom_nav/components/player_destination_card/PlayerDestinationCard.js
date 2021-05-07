import React, { useCallback, useMemo } from "react";
import css from "./PlayerDestinationCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import buildingActions from "../../../../../../../../redux/building/buildingActions";
import playersEssentialSelectors from "../../../../../../../../redux/players/selectors/playersEssentialSelectors";
import GraphModel from "../../../../../../../../services/GraphModel";
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";
import cn from "classnames";

const PlayerDestinationCard = ({ from, to, points, fromId, toId }) => {
  const dispatch = useDispatch();

  const activePlayerConnections = useSelector(
    playersEssentialSelectors.getActivePlayerConnections
  );

  const isActive = useMemo(() => {
    const connections = GraphModel.createUndirectedFromDirectedData(
      activePlayerConnections
    );
    const graphModel = new GraphModel(connections);
    return graphModel.areVertexesConnected(Number(fromId), Number(toId));
  }, [activePlayerConnections.length]);

  return (
    <div
      onMouseEnter={() => {
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
      }}
      onMouseLeave={() => {
        dispatch(
          buildingActions.setHover({
            from: null,
            to: null,
            connectionIds: [],
          })
        );
      }}
      className={cn(css["player-destination-card"], {
        [css["active"]]: isActive,
      })}
    >
      <div>
        {from} - {to}
      </div>
      <div className={css["points"]}>Points: {points}</div>
    </div>
  );
};

export default PlayerDestinationCard;
