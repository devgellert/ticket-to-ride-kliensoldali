import React from "react";
import css from "./GamePage.module.scss";

const GamePage = () => {
  return (
    <div className={css["GamePage"]}>
      <nav className={css["top-nav"]}>Hello</nav>
      <nav className={css["left-nav"]}>Hello</nav>
      <nav className={css["bottom-nav"]}>Hello</nav>
      <section className={css["map-wrap"]}>
        <img src="/map.jpg" alt="map" />
      </section>
    </div>
  );
};

export default GamePage;
