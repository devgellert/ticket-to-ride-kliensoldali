import React from "react";
import { useState, useEffect } from "react";

import constants from "../../../../../../../../constants";
import { createPortal } from "react-dom";
import css from "./Element.module.scss";

const Element = ({ element, imgWrapRef, color, isHovered, setIsHovered }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const { x: imgX, y: imgY } = imgWrapRef.current.getBoundingClientRect();

    const x = imgX + constants.onePercentWidth * element.x;
    const y = imgY + constants.onePercentHeight * element.y;
    setStyle({ left: x, top: y, backgroundColor: color });
  }, [imgWrapRef, element]);

  return createPortal(
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        !isHovered
          ? style
          : { ...style, border: "1px solid black", boxShadow: "1px 1px black" }
      }
      className={css["element"]}
    />,
    document.body
  );
};

export default Element;
