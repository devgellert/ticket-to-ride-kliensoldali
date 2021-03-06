import React, { useContext, useMemo } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
//
import playersDerivativeSelectors from "../../redux/players/selectors/playersDerivativeSelectors";
import buildingActions from "../../redux/building/buildingActions";
import GraphModel from "../../services/GraphModel";
import playersEssentialSelectors from "../../redux/players/selectors/playersEssentialSelectors";
//
import css from "./FinalTable.module.scss";
import { Redirect } from "react-router-dom";
import { SocketContext } from "../../SocketContext";

const FinalTable = () => {
  const playerFinalStatistics = useSelector(
    playersDerivativeSelectors.getFinalStatistics
  );

  const finalDestinationConnections = useSelector(
    playersDerivativeSelectors.getFinalDestinationConnections
  );

  const { isGameStarted, isInRoom } = useContext(SocketContext);

  if (!isGameStarted) {
    return <Redirect to={isInRoom ? "/waiting" : "/main"} />;
  }

  const makeDestinations = (playerIndex) => {
    const destinationConnection = finalDestinationConnections[playerIndex];

    return (
      <div>
        {map(destinationConnection.destinations, (destination) => {
          const FinalDestination = () => {
            const dispatch = useDispatch();

            const activePlayerConnections = useSelector((state) =>
              playersEssentialSelectors.getPlayerConnections(state, playerIndex)
            );
            const isActive = useMemo(() => {
              const connections = GraphModel.createUndirectedFromDirectedData(
                activePlayerConnections
              );
              const graphModel = new GraphModel(connections);
              return graphModel.areVertexesConnected(
                Number(destination.from),
                Number(destination.to)
              );
            }, [activePlayerConnections.length]);

            return (
              <div
                onMouseEnter={() => {
                  const connections = GraphModel.createUndirectedFromDirectedData(
                    activePlayerConnections
                  );
                  const graphModel = new GraphModel(connections);

                  const connectionIds = graphModel.getPath(
                    Number(destination.from),
                    Number(destination.to)
                  );

                  dispatch(
                    buildingActions.setHover({
                      from: destination.from,
                      to: destination.to,
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
                className={cn(css["destination"], {
                  [css["active"]]: isActive,
                })}
              >
                {destination.fromCity + " - " + destination.toCity}
              </div>
            );
          };

          return <FinalDestination />;
        })}
      </div>
    );
  };

  const makeRows = () => {
    return map(playerFinalStatistics, (statistics, index) => {
      return (
        <tr>
          <td>{statistics.name}</td>
          <td>{statistics.routePoints}</td>
          <td>{statistics.destinationPoints}</td>
          <td>{statistics.allPoints}</td>
          <td>{makeDestinations(statistics.index)}</td>
          <td>{index + 1}</td>
        </tr>
      );
    });
  };

  return (
    <div className={css["final-table"]}>
      <h1>
        Nyertes: {playerFinalStatistics[0].name} (pontok:{" "}
        {playerFinalStatistics[0].allPoints})
      </h1>

      <table>
        <thead>
          <tr>
            <th>N??v</th>
            <th>??t pontok</th>
            <th>C??l pontok</th>
            <th>??sszes pont</th>
            <th>Helyezett</th>
            <th>C??lok</th>
          </tr>
        </thead>
        <tbody>{makeRows()}</tbody>
      </table>

      <a href="/main">Vissza a f??oldalra</a>
    </div>
  );
};

export default FinalTable;
