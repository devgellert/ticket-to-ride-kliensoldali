import React from "react";
import cn from "classnames";
import css from "./PlayerLocomotiveCard.module.scss";
import selectCardForBuilding from "../../thunks/selectCardForBuilding";
import { useDispatch, useSelector } from "react-redux";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";

const PlayerLocomotiveCard = ({ type }) => {
  const dispatch = useDispatch();
  const activePlayerCardTypeNumbers = useSelector(
    playersDerivativeSelectors.getActivePlayerCardTypeNumbers
  );
  const selectedConnection = useSelector(
    buildingEssentialSelectors.getSelectedConnection
  );

  const isDisabled = !selectedConnection;

  const onClick = () => {
    if (isDisabled) return;
    dispatch(selectCardForBuilding(type));
  };

  const quantity = activePlayerCardTypeNumbers[type];

  if (quantity === 0) return null;

  const backgroundColor = type !== "locomotive" ? type : "khaki";
  const backgroundImage = type === "locomotive" ? `url(/loco.jpg)` : undefined;

  return (
    <div
      className={cn(css["player-locomotive-card"], {
        [css["disabled"]]: isDisabled,
      })}
      style={{
        backgroundColor,
        backgroundImage,
      }}
      onClick={onClick}
    >
      <span>{quantity}</span>
    </div>
  );
};

export default PlayerLocomotiveCard;
