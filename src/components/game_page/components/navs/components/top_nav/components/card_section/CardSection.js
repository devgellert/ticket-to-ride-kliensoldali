import React from "react";
import css from "./CardSection.module.scss";

const CardSection = () => {
  return (
    <div className={css["card-section"]}>
      <div className={css["deck"]}>Célok paklija</div>
      <div className={css["deck"]}>Vasutak paklija</div>

      <div className={css["card"]}>card</div>
      <div className={css["card"]}></div>
      <div className={css["card"]}></div>
      <div className={css["card"]}></div>
      <div className={css["card"]}></div>
    </div>
  );
};

export default CardSection;
