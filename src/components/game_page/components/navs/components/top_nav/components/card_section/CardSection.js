import React from "react";
import css from "./CardSection.module.scss";
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";
import { useDispatch, useSelector } from "react-redux";
import generalEssentialSelectors from "../../../../../../../../redux/general/selectors/generalEssentialSelectors";
import handleFieldCardClick from "../../../../../../../../redux/business/handleFieldCardClick";

const CardSection = () => {
  const dispatch = useDispatch();
  const field = useSelector(generalEssentialSelectors.getField);

  const handleCardClick = (id) => dispatch(handleFieldCardClick(id));

  const locomotives = (
    <>
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
        onClick={() => {
          // putCardInHand(getRandomValidColorFromDeck());
        }}
      />
      {field.map((elem) => (
        <FieldLocomotiveCard
          key={elem.id}
          color={elem.type}
          id={elem.id}
          onClick={handleCardClick}
        />
      ))}
    </>
  );

  return <div className={css["card-section"]}>{locomotives}</div>;
};

export default CardSection;
