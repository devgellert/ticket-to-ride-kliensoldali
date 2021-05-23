import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
//
import generalEssentialSelectors from "../../../../../../../../redux/general/selectors/generalEssentialSelectors";
import handleFieldCardClickThunk from "../../../../../../../../redux/thunks/handleFieldCardClickThunk";
import handleDeckCardClickThunk from "../../../../../../../../redux/thunks/handleDeckCardClickThunk";
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";
import generalDerivativeSelectors from "../../../../../../../../redux/general/selectors/generalDerivativeSelectors";
//
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";
//
import css from "./CardSection.module.scss";
import { SocketContext } from "../../../../../../../../SocketContext";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";

const CardSection = () => {
  const dispatch = useDispatch();
  const [isDisabledByDebounce, setIsDisabledByDebounce] = useState(false);

  const field = useSelector(generalEssentialSelectors.getField);
  const selectedConnection = useSelector(
    buildingEssentialSelectors.getSelectedConnection
  );
  const isCardDeckEmpty = useSelector(
    generalDerivativeSelectors.isCardDeckEmpty
  );
  const { playerIndex } = useContext(SocketContext);
  const isMyTurn = useSelector((state) =>
    playersDerivativeSelectors.isMyTurn(state, playerIndex)
  );

  const isCardClickDisabled =
    isDisabledByDebounce || selectedConnection !== null;

  const handleDebounce = () => {
    setIsDisabledByDebounce(true);
    setTimeout(() => {
      setIsDisabledByDebounce(false);
    }, 500);
  };

  const onCardClick = (id) => {
    if (isCardClickDisabled) return;
    handleDebounce();
    dispatch(handleFieldCardClickThunk(id));
  };

  const isDeckClickDisabled =
    !isMyTurn || isDisabledByDebounce || isCardClickDisabled || isCardDeckEmpty;

  const onDeckClick = () => {
    if (isDeckClickDisabled) return;
    handleDebounce();
    dispatch(handleDeckCardClickThunk());
  };

  return (
    <div className={css["card-section"]}>
      <div
        className={cn(css["deck"], {
          [css["disabled"]]: isDeckClickDisabled,
        })}
        style={{ backgroundImage: 'url("/card-back.png")' }}
        onClick={onDeckClick}
      />
      {field.map((elem) => (
        <FieldLocomotiveCard
          isDisabled={isCardClickDisabled}
          key={elem.id}
          color={elem.type}
          id={elem.id}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default CardSection;
