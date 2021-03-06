import React from "react";
import cn from "classnames";
//
import css from "./Player.module.scss";

const Player = ({
  name,
  points,
  vagons,
  cards,
  aims: destinations,
  round,
  isActive,
}) => {
  return (
    <div className={cn(css["player"], { [css["active"]]: isActive })}>
      <div>
        <p>{name}</p>
        <ul>
          <li>
            <b>Pontok:</b> {points}
          </li>
          <li>
            <b>Vagonok:</b> {vagons}
          </li>
          <li>
            <b>Kártyák:</b> {cards}
          </li>
          <li>
            <b>Célok:</b> {destinations}
          </li>
          <li>
            <b>Kör:</b> {round}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Player;
