import React from "react";
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

const CardSection = () => {
  const dispatch = useDispatch();

  const field = useSelector(generalEssentialSelectors.getField);
  const selectedConnection = useSelector(
    buildingEssentialSelectors.getSelectedConnection
  );
  const isCardDeckEmpty = useSelector(
    generalDerivativeSelectors.isCardDeckEmpty
  );

  const isCardClickDisabled = selectedConnection !== null;

  const onCardClick = (id) => {
    if (isCardClickDisabled) return;
    dispatch(handleFieldCardClickThunk(id));
  };

  const isDeckClickDisabled = isCardClickDisabled || isCardDeckEmpty;

  const onDeckClick = () => {
    if (isDeckClickDisabled) return;
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
