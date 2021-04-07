import React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./City.module.scss";

const imgWidth = 800;
const imgHeight = 544;
const onePercentWidth = imgWidth / 100;
const onePercentHeight = imgHeight / 100;

const City = ({ city, imgWrapRef }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const { x: imgX, y: imgY } = imgWrapRef.current.getBoundingClientRect();

    const x = imgX + onePercentWidth * city.x;
    const y = imgY + onePercentHeight * city.y;
    console.log(x, y);
    setStyle({ left: x, top: y });
  }, [imgWrapRef, city]);

  return createPortal(
    <div style={style} className={css["city"]} />,
    document.body
  );
};

export default City;
