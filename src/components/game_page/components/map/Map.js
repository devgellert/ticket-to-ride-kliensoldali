import React from "react";
import { createRef } from "react";
import { keys, map } from "lodash";
//
import { ticketToRideData as data } from "../../../../ticket-to-ride-data";
//
import City from "./compontents/city/City";
import Connection from "./compontents/connection/Connection";
//
import css from "./Map.module.scss";

const { cities, connections } = data;

const Map = () => {
  const wrapRef = createRef();

  return (
    <section ref={wrapRef} className={css["map-wrap"]}>
      <img width={800} height={544} src="/map.jpg" alt="map" />

      {map(keys(cities), (key, index) => (
        <City key={index} city={cities[key]} imgWrapRef={wrapRef} />
      ))}

      {map(keys(connections), (key, index) => (
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
