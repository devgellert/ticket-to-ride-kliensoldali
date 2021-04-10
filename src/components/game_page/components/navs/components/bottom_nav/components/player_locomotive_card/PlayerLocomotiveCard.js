import React from "react";
import css from "./PlayerLocomotiveCard.module.scss";

const PlayerLocomotiveCard = ({ color, quantity }) => (
  <div
    className={css["player-locomotive-card"]}
    style={{
      backgroundColor: color !== "locomotive" ? color : "khaki",
      backgroundImage: color === "locomotive" ? `url(/loco.jpg)` : undefined,
    }}
  >
    <span>{quantity}</span>
  </div>
);

export default PlayerLocomotiveCard;
