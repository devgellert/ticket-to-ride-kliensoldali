import React from "react";
import css from "./PlayerDestinationCard.module.scss";

const PlayerDestinationCard = ({ from, to, points }) => (
  <div className={css["player-destination-card"]}>
    <div>
      {from} - {to}
    </div>
    <div className={css["points"]}>Points: {points}</div>
  </div>
);

export default PlayerDestinationCard;
