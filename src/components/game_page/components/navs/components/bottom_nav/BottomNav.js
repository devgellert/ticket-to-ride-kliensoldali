import React from "react";
import css from "./BottomNav.module.scss";
import SelectedCardDisplay from "./components/selected_card_display/SelectedCardDisplay";
import Destinations from "./components/destinations/Destinations";
import Cards from "./components/cards/Cards";
import Logs from "./components/logs/Logs";

const BottomNav = () => {
  return (
    <>
      <SelectedCardDisplay />

      <nav className={css["bottom-nav"]}>
        <Destinations />
        <Cards />
        <Logs />
      </nav>
    </>
  );
};

export default BottomNav;
