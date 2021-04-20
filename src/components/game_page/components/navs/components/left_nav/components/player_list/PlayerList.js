import React from "react";
import Player from "./components/Player";
import { useSelector } from "react-redux";
import css from "./PlayerList.module.scss";
import playersSelectors from "../../../../../../../../redux/players/playersSelectors";
import { map } from "lodash";

const PlayerList = () => {
  const playersStatistics = useSelector(playersSelectors.getPlayersStatistics);

  return (
    <div className={css["player-list"]}>
      {map(playersStatistics, (stat) => (
        <Player {...stat} />
      ))}
    </div>
  );
};

export default PlayerList;
