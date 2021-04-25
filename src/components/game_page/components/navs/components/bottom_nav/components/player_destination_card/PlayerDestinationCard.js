import React from "react";
import css from "./PlayerDestinationCard.module.scss";
import { useDispatch } from "react-redux";
import buildingActions from "../../../../../../../../redux/building/buildingActions";

const PlayerDestinationCard = ({ from, to, points }) => {
  const dispatch = useDispatch();

  return (
    <div
      onMouseEnter={() => {
        dispatch(buildingActions.setHover({ from, to }));
      }}
      onMouseLeave={() => {
        dispatch(buildingActions.setHover({ from: null, to: null }));
      }}
      className={css["player-destination-card"]}
    >
      <div>
        {from} - {to}
      </div>
      <div className={css["points"]}>Points: {points}</div>
    </div>
  );
};

export default PlayerDestinationCard;
