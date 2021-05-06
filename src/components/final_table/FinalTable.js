import React from "react";
import css from "./FinalTable.module.scss";
import { useSelector } from "react-redux";
import { map } from "lodash";
import playersDerivativeSelectors from "../../redux/players/selectors/playersDerivativeSelectors";

const FinalTable = () => {
  const playerFinalStatistics = useSelector(
    playersDerivativeSelectors.getFinalStatistics
  );

  const makeRows = () => {
    return map(playerFinalStatistics, (statistics, index) => {
      return (
        <tr>
          <td>{statistics.name}</td>
          <td>{statistics.routePoints}</td>
          <td>{statistics.destinationPoints}</td>
          <td>{statistics.allPoints}</td>
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
          </tr>
        </thead>
        <tbody>{makeRows()}</tbody>
      </table>

      <a href="/main">Vissza a főoldalra</a>
    </div>
  );
};

export default FinalTable;
