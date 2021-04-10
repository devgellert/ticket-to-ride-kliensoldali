import React from "react";
import css from "./FinalTable.module.scss";

const FinalTable = () => {
  return (
    <div className={css["final-table"]}>
      <h1>Nyertes: Puskás Gellért (pontok: 100)</h1>

      <table>
        <thead>
          <tr>
            <th>Név</th>
            <th>Pontok</th>
            <th>Helyezett</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Puskás Gellért</td>
            <td>100</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Kovács Pista</td>
            <td>99</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>

      <a href="/main">Vissza a főoldalra</a>
    </div>
  );
};

export default FinalTable;
