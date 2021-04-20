import React from "react";
import Player from "./components/Player";
import { useSelector } from "react-redux";
import css from "./PlayerList.module.scss";
import playersSelectors from "../../../../../../../../redux/players/playersSelectors";

const PlayerList = () => {
  const players = useSelector(playersSelectors.getPlayers);

  return (
    <div className={css["player-list"]}>
      {/*{players.map(({ hand, name }) => (*/}
      {/*  <Player*/}
      {/*    aims={hand.destinations.length}*/}
      {/*    cards={hand.cards.length}*/}
      {/*    name={name}*/}
      {/*    points={0}*/}
      {/*    round={0}*/}
      {/*    vagons={0}*/}
      {/*  />*/}
      {/*))}*/}
    </div>
  );
};

export default PlayerList;
