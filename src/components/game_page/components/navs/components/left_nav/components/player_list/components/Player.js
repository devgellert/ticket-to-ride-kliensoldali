import React from "react";
import css from "./Player.module.scss";

const Player = ({ name, points, vagons, cards, aims, round }) => {
  return (
    <div className={css["player"]}>
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
            <b>Célok:</b> {aims}
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
