import React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import constants from "../../../../../../constants";
import css from "./City.module.scss";
import { useSelector } from "react-redux";
import buildingEssentialSelectors from "../../../../../../redux/building/selectors/buildingEssentialSelectors";
import cn from "classnames";

const City = ({ city, imgWrapRef }) => {
  const hover = useSelector(buildingEssentialSelectors.getHover);

  const isHovered = [hover.from, hover.to].includes(city.city);

  const [style, setStyle] = useState({});

  useEffect(() => {
    const { x: imgX, y: imgY } = imgWrapRef.current.getBoundingClientRect();

    const x = imgX + constants.onePercentWidth * city.x;
    const y = imgY + constants.onePercentHeight * city.y;
    setStyle({ left: x, top: y });
  }, [imgWrapRef, city]);

  return createPortal(
    <div
      style={style}
      className={cn(css["city"], { [css["hover"]]: isHovered })}
    />,
    document.body
  );
};

export default City;
