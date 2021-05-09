import React from "react";
import { useSelector } from "react-redux"
import css from "./TopNav.module.scss";
import CardSection from "./components/card_section/CardSection";
import roundDerivativeSelectors from "../../../../../../redux/round/selectors/roundDerivativeSelectors"


const TopNav = () => {
  const isGameEnded = useSelector(roundDerivativeSelectors.isGameEnded);
  if (!isGameEnded)
    return (
      <nav className={css["top-nav"]}>
        <CardSection />
      </nav>
    );

  return <nav className={css["top-nav"]} />

};

export default TopNav;
