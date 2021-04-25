import React from "react";
import css from "./BottomNav.module.scss";
import SelectedCardDisplay from "./components/selected_card_display/SelectedCardDisplay";
import Destinations from "./components/destinations/Destinations";
import Cards from "./components/cards/Cards";

const BottomNav = () => {
  return (
    <>
      <SelectedCardDisplay />

      <nav className={css["bottom-nav"]}>
        <Destinations />
        <Cards />
      </nav>
    </>
  );
};

export default BottomNav;
