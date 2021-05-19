import React from "react";
import { noop } from "lodash";
import cn from "classnames";
import { useSelector } from "react-redux";
//
import roundDerivativeSelectors from "../../../../../../../../../../redux/round/selectors/roundDerivativeSelectors";
//
import css from "./FieldLocomotiveCard.module.scss";

const FieldLocomotiveCard = ({
  color,
  onClick = noop,
  id,
  isDisabled: isDisabledProp,
}) => {
  const canDrawLocomotive = useSelector(
    roundDerivativeSelectors.canDrawLocomotive
  );

  const isDisabled =
    isDisabledProp || (color === "locomotive" && !canDrawLocomotive);

  return (
    <div
      className={cn(css["field-locomotive-card"], {
        [css["disabled"]]: isDisabled,
      })}
      style={{
        backgroundColor: color !== "locomotive" ? color : "khaki",
        backgroundImage: color === "locomotive" ? `url(/loco.jpg)` : undefined,
      }}
      onClick={isDisabled ? noop : () => onClick(id)}
    />
  );
};

export default FieldLocomotiveCard;
