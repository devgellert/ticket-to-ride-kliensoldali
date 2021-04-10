import React from "react";
import { useState, useEffect } from "react";

import constants from "../../../../../../../../constants";
import { createPortal } from "react-dom";
import css from "./Element.module.scss";
import { useSelector } from "react-redux";

const Element = ({
  element,
  imgWrapRef,
  color,
  isHovered,
  setIsHovered,
  onClick,
  connectionId,
}) => {
  const [style, setStyle] = useState({});

  const buildConnectionIds = useSelector((state) => state.buildConnectionIds);

  useEffect(() => {
    const { x: imgX, y: imgY } = imgWrapRef.current.getBoundingClientRect();

    const x = imgX + constants.onePercentWidth * element.x;
    const y = imgY + constants.onePercentHeight * element.y;
    setStyle({ left: x, top: y, backgroundColor: color });
  }, [imgWrapRef, element, color]);

  const isBuild = buildConnectionIds.includes(connectionId);

  if (isBuild)
    // TODO if selected
    return createPortal(
      <img
        src="/loco.svg"
        alt="asd"
        style={{ zIndex: 100000, ...style }}
        className={css["loco-element"]}
      />,
      document.body
    );

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
      onClick={onClick}
    />,
    document.body
  );
};

export default Element;
