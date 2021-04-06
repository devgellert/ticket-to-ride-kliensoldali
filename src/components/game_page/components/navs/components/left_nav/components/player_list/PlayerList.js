import React from "react";
import Player from "./components/Player";
import css from "./PlayerList.module.scss";

const PlayerList = () => {
  return (
    <div className={css["player-list"]}>
      <Player
        aims={10}
        cards={2}
        name={"Gellert Puskas"}
        points={3}
        round={4}
        vagons={5}
      />
      <Player
        aims={10}
        cards={2}
        name={"Gellert Puskas"}
        points={3}
        round={4}
        vagons={5}
      />
      <Player
        aims={10}
        cards={2}
        name={"Gellert Puskas"}
        points={3}
        round={4}
        vagons={5}
      />
      <Player
        aims={10}
        cards={2}
        name={"Gellert Puskas"}
        points={3}
        round={4}
        vagons={5}
      />
      <Player
        aims={10}
        cards={2}
        name={"Gellert Puskas"}
        points={3}
        round={4}
        vagons={5}
      />
    </div>
  );
};

export default PlayerList;
