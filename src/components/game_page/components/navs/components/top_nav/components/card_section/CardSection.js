import React from "react";
import css from "./CardSection.module.scss";

const CardSection = () => {
  return (
    <div className={css["card-section"]}>
      <div className={css["title-wrap"]}>
        <h2>Célok:</h2>
      </div>
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
      ></div>
      <div className={css["title-wrap"]}>
        <h2>Vasutak:</h2>
      </div>
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
      ></div>

      <div className={css["card"]}>card</div>
      <div className={css["card"]}></div>
      <div className={css["card"]}></div>
      <div className={css["card"]}></div>
      <div className={css["card"]}></div>
    </div>
  );
};

export default CardSection;
