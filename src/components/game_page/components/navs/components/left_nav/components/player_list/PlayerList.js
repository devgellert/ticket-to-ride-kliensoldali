import React from "react";
import Player from "./components/Player";
import { useSelector } from "react-redux";
import css from "./PlayerList.module.scss";
import { map } from "lodash";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";

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
