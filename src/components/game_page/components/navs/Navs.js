import React from "react";
import css from "./Navs.module.scss";

const Navs = () => {
  return (
    <>
      <nav className={css["top-nav"]}>Hello</nav>
      <nav className={css["left-nav"]}>Hello</nav>
      <nav className={css["bottom-nav"]}>Hello</nav>
    </>
  );
};

export default Navs;
