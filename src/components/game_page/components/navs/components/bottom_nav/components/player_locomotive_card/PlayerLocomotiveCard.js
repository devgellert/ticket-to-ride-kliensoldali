import React from "react";
import css from "./PlayerLocomotiveCard.module.scss";

const PlayerLocomotiveCard = ({ color, quantity }) => (
  <div className={css["player-locomotive-card"]}>
    {color}: {quantity}
  </div>
);

export default PlayerLocomotiveCard;
