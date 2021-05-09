import React from "react";
import { useSelector } from "react-redux";
import css from "./BottomNav.module.scss";
import SelectedCardDisplay from "./components/selected_card_display/SelectedCardDisplay";
import Destinations from "./components/destinations/Destinations";
import Cards from "./components/cards/Cards";
import Logs from "./components/logs/Logs";
import roundDerivativeSelectors from "../../../../../../redux/round/selectors/roundDerivativeSelectors"

const BottomNav = () => {
  const isGameEnded = useSelector(roundDerivativeSelectors.isGameEnded);

  if (!isGameEnded)
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

  return <nav className={css["bottom-nav"]} />
};

export default BottomNav;
