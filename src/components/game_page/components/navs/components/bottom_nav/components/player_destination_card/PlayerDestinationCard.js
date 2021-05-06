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

  const hover = useSelector(buildingEssentialSelectors.getHover);

  const isActive = useMemo(() => {
    const connections = activePlayerConnections.reduce(
      (acc, elem) => [
        ...(acc || []),
        {
          from: Number(elem.from),
          to: Number(elem.to),
        },
        {
          from: Number(elem.to),
          to: Number(elem.from),
        },
      ],
      []
    );
    const graphModel = new GraphModel(connections);
    return graphModel.areVertexesConnected(Number(fromId), Number(toId));
  }, [activePlayerConnections.length]);

  return (
    <div
      onMouseEnter={() => {
        dispatch(
          buildingActions.setHover({
            from: fromId,
            to: toId,
            connectionIds: [], // TODO del
          })
        );
      }}
      onMouseLeave={() => {
        dispatch(
          buildingActions.setHover({
            from: null,
            to: null,
            connectionIds: [], // TODO del
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
