import React from "react";
import css from "./WaitingPage.module.scss";

const WaitingPage = () => {
  return (
    <div className={css["waiting-page"]}>
      <h1>Szoba: 13213213211</h1>
      <a href="/main">Vissza a főoldalra</a>
    </div>
  );
};

export default WaitingPage;
