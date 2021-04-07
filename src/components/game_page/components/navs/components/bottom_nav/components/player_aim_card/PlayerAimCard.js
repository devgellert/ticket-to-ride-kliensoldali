import React from "react";
import css from "./PlayerAimCard.module.scss";

const PlayerAimCard = ({ from, to }) => (
  <div className={css["player-aim-card"]}>
    {from} - {to}
  </div>
);

export default PlayerAimCard;
