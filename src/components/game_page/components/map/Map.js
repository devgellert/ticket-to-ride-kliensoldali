import React from "react";
import { useEffect, createRef } from "react";
import { ticketToRideData as data } from "../../../../ticket-to-ride-data";

import css from "./Map.module.scss";
import City from "./compontents/city/City";

const { cities } = data;

const Map = () => {
  const wrapRef = createRef();

  return (
    <section ref={wrapRef} className={css["map-wrap"]}>
      <img width={800} height={544} src="/map.jpg" alt="map" />

      {Object.keys(cities).map((key) => (
        <City city={cities[key]} imgWrapRef={wrapRef} />
      ))}
    </section>
  );
};

export default Map;
