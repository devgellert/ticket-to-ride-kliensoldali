import React from "react";
import css from "./TopNav.module.scss";
import CardSection from "./components/card_section/CardSection";

const TopNav = () => {
  return (
    <nav className={css["top-nav"]}>
      <CardSection />
    </nav>
  );
};

export default TopNav;
