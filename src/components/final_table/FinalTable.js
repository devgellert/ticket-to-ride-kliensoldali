import React from "react";
import css from "./FinalTable.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { map, forEach } from "lodash";
import playersDerivativeSelectors from "../../redux/players/selectors/playersDerivativeSelectors";
import buildingActions from "../../redux/building/buildingActions";

const FinalTable = () => {
  const dispatch = useDispatch();
  const playerFinalStatistics = useSelector(
    playersDerivativeSelectors.getFinalStatistics
  );

  const finalDestinationConnections = useSelector(
    playersDerivativeSelectors.getFinalDestinationConnections
  );

  const makeDestinations = (playerIndex) => {
    const destinationConnection = finalDestinationConnections[playerIndex];

    return <div>
      {map(destinationConnection.destinations, destination => (
        <div
          onMouseEnter={() => {
            dispatch(
              buildingActions.setHover({

                from: destination.from,
                to: destination.to,
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
          className={css["destination"]}>{destination.fromCity + " - " + destination.toCity}</div>
      ))}
    </div>
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
            <th>Név</th>
            <th>Út pontok</th>
            <th>Cél pontok</th>
            <th>Összes pont</th>
            <th>Helyezett</th>
            <th>Célok</th>
          </tr>
        </thead>
        <tbody>{makeRows()}</tbody>
      </table>

      <a href="/main">Vissza a főoldalra</a>
    </div>
  );
};

export default FinalTable;
