import React from "react";
import css from "./CardSection.module.scss";
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";
import { useDispatch, useSelector } from "react-redux";
import generalEssentialSelectors from "../../../../../../../../redux/general/selectors/generalEssentialSelectors";
import handleFieldCardClick from "../../../../../../../../redux/business/handleFieldCardClick";
import handleDeckCardClick from "../../../../../../../../redux/business/handleDeckCardClick";
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";
import cn from "classnames";
import generalDerivativeSelectors from "../../../../../../../../redux/general/selectors/generalDerivativeSelectors";

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
  const handleCardClick = (id) => {
    if (isCardClickDisabled) return;
    dispatch(handleFieldCardClick(id));
  };

  const isDeckClickDisabled = isCardClickDisabled || isCardDeckEmpty;

  const cards = (
    <>
      <div
        className={cn(css["deck"], {
          [css["disabled"]]: isDeckClickDisabled,
        })}
        style={{ backgroundImage: 'url("/card-back.png")' }}
        onClick={() => {
          if (isDeckClickDisabled) return;

          dispatch(handleDeckCardClick());
        }}
      />
      {field.map((elem) => (
        <FieldLocomotiveCard
          isDisabled={isCardClickDisabled}
          key={elem.id}
          color={elem.type}
          id={elem.id}
          onClick={handleCardClick}
        />
      ))}
    </>
  );

  return <div className={css["card-section"]}>{cards}</div>;
};

export default CardSection;
