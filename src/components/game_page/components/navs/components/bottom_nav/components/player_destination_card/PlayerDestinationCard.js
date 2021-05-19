import React, { useMemo } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
//
import playersEssentialSelectors from "../../../../../../../../redux/players/selectors/playersEssentialSelectors";
import GraphModel from "../../../../../../../../services/GraphModel";
import showHoveredDestinationThunk from "../../../../../../../../redux/thunks/showHoveredDestinationThunk";
import hideHoveredDestinationThunk from "../../../../../../../../redux/thunks/hideHoveredDestinationThunk";
//
import css from "./PlayerDestinationCard.module.scss";

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

  const onMouseEnter = () =>
    dispatch(showHoveredDestinationThunk(fromId, toId));

  const onMouseLeave = () => dispatch(hideHoveredDestinationThunk());

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
