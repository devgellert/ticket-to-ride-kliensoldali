import React from "react";
import css from "./LeftNav.module.scss";
import PlayerList from "./components/player_list/PlayerList";
//

const LeftNav = () => {
  return (
    <nav className={css["left-nav"]}>
      <PlayerList />
    </nav>
  );
};

export default LeftNav;
