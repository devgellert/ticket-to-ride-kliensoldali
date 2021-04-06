import React from "react";
import css from "./Navs.module.scss";
import TopNav from "./components/top_nav/TopNav";

const Navs = () => {
  return (
    <>
      <TopNav />
      <nav className={css["left-nav"]}>Hello</nav>
      <nav className={css["bottom-nav"]}>Hello</nav>
    </>
  );
};

export default Navs;
