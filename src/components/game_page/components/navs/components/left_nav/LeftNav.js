import React from "react";
//
import PlayerList from "./components/player_list/PlayerList";
//
import css from "./LeftNav.module.scss";

const LeftNav = () => (
  <nav className={css["left-nav"]}>
    <PlayerList />
  </nav>
);

export default LeftNav;
