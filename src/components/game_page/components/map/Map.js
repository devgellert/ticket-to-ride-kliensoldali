import React from "react";
import { createRef } from "react";
import { ticketToRideData as data } from "../../../../ticket-to-ride-data";

import css from "./Map.module.scss";
import City from "./compontents/city/City";
import Connection from "./compontents/connection/Connection";

const { cities, connections } = data;

const Map = () => {
  const wrapRef = createRef();

  return (
    <section ref={wrapRef} className={css["map-wrap"]}>
      <img width={800} height={544} src="/map.jpg" alt="map" />

      {Object.keys(cities).map((key, index) => (
        <City key={index} city={cities[key]} imgWrapRef={wrapRef} />
      ))}

      {Object.keys(connections).map((key, index) => (
        <Connection
          key={index}
          connection={connections[key]}
          imgWrapRef={wrapRef}
        />
      ))}
    </section>
  );
};

export default Map;
