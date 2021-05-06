import React from "react";
import { useState, useEffect } from "react";
import cn from "classnames";
import constants from "../../../../../../../../constants";
import { createPortal } from "react-dom";
import css from "./Element.module.scss";
import { noop } from "lodash";

const Element = ({
  element,
  imgWrapRef,
  color,
  isHovered,
  setIsHovered,
  onClick,
  isDisabled,
  isBuilt,
  isSelected,
  isActive,
}) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const { x: imgX, y: imgY } = imgWrapRef.current.getBoundingClientRect();

    const x = imgX + constants.onePercentWidth * element.x;
    const y = imgY + constants.onePercentHeight * element.y;
    setStyle({ left: x, top: y, backgroundColor: color });
  }, [imgWrapRef, element, color]);

  if (isBuilt)
    // TODO if selected
    return createPortal(
      <img
        src="/loco.svg"
        alt="asd"
        style={{ zIndex: 100000, ...style }}
        className={cn(css["loco-element"], { [css["disabled"]]: isDisabled })}
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
      className={cn(css["element"], {
        [css["disabled"]]: isDisabled,
        [css["selected"]]: isSelected,
        [css["active"]]: isActive,
      })}
      onClick={isDisabled || isSelected ? noop : onClick}
    />,
    document.body
  );
};

export default Element;
