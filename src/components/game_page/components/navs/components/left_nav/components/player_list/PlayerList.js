import React from "react";
import { map } from "lodash";
import { useSelector } from "react-redux";
//
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
//
import Player from "./components/Player";
//
import css from "./PlayerList.module.scss";

const PlayerList = () => {
  const playersStatistics = useSelector(
    playersDerivativeSelectors.getPlayersStatistics
  );

  return (
    <div className={css["player-list"]}>
      {map(playersStatistics, (stat, index) => (
        <Player key={index} {...stat} />
      ))}
    </div>
  );
};

export default PlayerList;
