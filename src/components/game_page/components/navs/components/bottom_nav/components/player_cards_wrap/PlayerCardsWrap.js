import React from "react";
import css from "./PlayerCardsWrap.module.scss";

const PlayerCardsWrap = ({ children }) => {
  return <div className={css["player-cards-wrap"]}>{children}</div>;
};

export default PlayerCardsWrap;
