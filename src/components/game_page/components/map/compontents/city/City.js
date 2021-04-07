import React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import constants from "../../../../../../constants";
import css from "./City.module.scss";

const City = ({ city, imgWrapRef }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const { x: imgX, y: imgY } = imgWrapRef.current.getBoundingClientRect();

    const x = imgX + constants.onePercentWidth * city.x;
    const y = imgY + constants.onePercentHeight * city.y;
    setStyle({ left: x, top: y });
  }, [imgWrapRef, city]);

  return createPortal(
    <div style={style} className={css["city"]} />,
    document.body
  );
};

export default City;
