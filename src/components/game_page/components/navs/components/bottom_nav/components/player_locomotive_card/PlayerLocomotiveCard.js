import React from "react";
import { noop } from "lodash";
import cn from "classnames";
import css from "./PlayerLocomotiveCard.module.scss";

const PlayerLocomotiveCard = ({ color, quantity, onClick, isDisabled }) => (
  <div
    className={cn(css["player-locomotive-card"], {
      [css["disabled"]]: isDisabled,
    })}
    style={{
      backgroundColor: color !== "locomotive" ? color : "khaki",
      backgroundImage: color === "locomotive" ? `url(/loco.jpg)` : undefined,
    }}
    onClick={isDisabled ? noop : onClick}
  >
    <span>{quantity}</span>
  </div>
);

export default PlayerLocomotiveCard;
