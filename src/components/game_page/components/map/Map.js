import React from "react";
import css from "./Map.module.scss";

const Map = () => {
  return (
    <section className={css["map-wrap"]}>
      <img src="/map.jpg" alt="map" />
    </section>
  );
};

export default Map;
