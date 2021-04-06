import React from "react";
import css from "./Navs.module.scss";
import TopNav from "./components/top_nav/TopNav";
import LeftNav from "./components/left_nav/LeftNav";

const Navs = () => {
  return (
    <>
      <TopNav />
      <LeftNav />
      <nav className={css["bottom-nav"]}>Hello</nav>
    </>
  );
};

export default Navs;
