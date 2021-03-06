import React, { useContext } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { noop } from "lodash";
//
import selectCardForBuildingThunk from "../../../../../../../../redux/thunks/selectCardForBuildingThunk";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";
//
import css from "./PlayerLocomotiveCard.module.scss";
import { SocketContext } from "../../../../../../../../SocketContext";

const PlayerLocomotiveCard = ({ type, numbers }) => {
  const dispatch = useDispatch();
  const { playerIndex } = useContext(SocketContext);
  const isMyTurn = useSelector((state) =>
    playersDerivativeSelectors.isMyTurn(state, playerIndex)
  );
  const selectedConnection = useSelector(
    buildingEssentialSelectors.getSelectedConnection
  );

  const onClick = () => dispatch(selectCardForBuildingThunk(type));

  const quantity = numbers;

  if (quantity === 0) return null;

  const backgroundColor = type !== "locomotive" ? type : "khaki";
  const backgroundImage = type === "locomotive" ? `url(/loco.jpg)` : undefined;

  const isDisabled = !isMyTurn || !selectedConnection;

  return (
    <div
      className={cn(css["player-locomotive-card"], {
        [css["disabled"]]: isDisabled,
      })}
      style={{
        backgroundColor,
        backgroundImage,
      }}
      onClick={isDisabled ? noop : onClick}
    >
      <span>{quantity}</span>
    </div>
  );
};

export default PlayerLocomotiveCard;
