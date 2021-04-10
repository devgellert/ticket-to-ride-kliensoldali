import React from "react";
import css from "./PlayerAimCard.module.scss";

const PlayerAimCard = ({ from, to, points }) => (
  <div className={css["player-aim-card"]}>
    <div>
      {from} - {to}
    </div>
    <div className={css["points"]}>Points: {points}</div>
  </div>
);

export default PlayerAimCard;
