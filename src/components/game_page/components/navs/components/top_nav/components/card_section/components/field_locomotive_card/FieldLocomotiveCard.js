import React, { useContext } from "react";
import { noop } from "lodash";
import cn from "classnames";
import { useSelector } from "react-redux";
//
import roundDerivativeSelectors from "../../../../../../../../../../redux/round/selectors/roundDerivativeSelectors";
//
import css from "./FieldLocomotiveCard.module.scss";
import { SocketContext } from "../../../../../../../../../../SocketContext";
import playersDerivativeSelectors from "../../../../../../../../../../redux/players/selectors/playersDerivativeSelectors";

const FieldLocomotiveCard = ({
  color,
  onClick = noop,
  id,
  isDisabled: isDisabledProp,
}) => {
  const canDrawLocomotive = useSelector(
    roundDerivativeSelectors.canDrawLocomotive
  );
  const { playerIndex } = useContext(SocketContext);
  const isMyTurn = useSelector((state) =>
    playersDerivativeSelectors.isMyTurn(state, playerIndex)
  );

  const isDisabled =
    !isMyTurn ||
    isDisabledProp ||
    (color === "locomotive" && !canDrawLocomotive);

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
