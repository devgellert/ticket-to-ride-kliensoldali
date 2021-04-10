import React from "react";
import css from "./GamePage.module.scss";
import Navs from "./components/navs/Navs";
import Map from "./components/map/Map";
import FinalTable from "./components/final_table/FinalTable";

const GamePage = () => {
  React.useEffect(() => {
    // setup
  }, []);

  return (
    <div className={css["GamePage"]}>
      <Navs />
      <Map />
    </div>
  );
};

export default GamePage;
