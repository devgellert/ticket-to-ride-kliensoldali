import React from "react";
import { useEffect, useState } from "react";
import { ticketToRideData as data } from "../../../../../../../../ticket-to-ride-data";
import css from "./CardSection.module.scss";
import { v4 as uuid } from "uuid";
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";
import { connect } from "react-redux";
import {
  setLocomotiveField,
  setPlayerLocomotivesInHand,
} from "../../../../../../../../redux/actions";
import shuffle from "../../../../../../../../utils/shuffle";

const CardSection = ({
  deck,
  setLocomotiveField,
  locomotiveField,
  setPlayerLocomotivesInHand,
  playerLocomotivesInHand,
}) => {
  const { destinations } = data;

  const [aimDeck, setAimDeck] = useState([]);

  const handlePutLocomotivesToField = () => {
    const MAX_COUNT = 5;
    const newLocomotiveField = [];
    while (newLocomotiveField.length < MAX_COUNT) {
      const keys = window.Object.keys(deck);
      const shuffledKeys = shuffle(keys);
      const newKey = shuffledKeys[0];
      newLocomotiveField.push({
        color: newKey,
        id: uuid(),
      });
    }
    setLocomotiveField(newLocomotiveField);
  };

  useEffect(() => {
    const keys = window.Object.keys(destinations);
    const shuffledKeys = shuffle(keys);

    const newAimDeck = [];
    shuffledKeys.forEach((key) => {
      newAimDeck.push(destinations[key]);
    });
    setAimDeck(newAimDeck);
    //
    handlePutLocomotivesToField();
  }, []);

  useEffect(() => {
    // TODO: 3 mozdony kártyánál minden eldobása, 5 kártya húzása.
  }, [locomotiveField]);

  const incrementHandWithColor = (color) => {
    const newField = {
      ...playerLocomotivesInHand,
      [color]: locomotiveField[color] + 1,
    };

    setPlayerLocomotivesInHand(newField);
  };

  const handleCardClick = (id) => {
    const clickedElem = locomotiveField.find((elem) => elem.id !== id);
    if (!clickedElem) return;
    const { color } = clickedElem;
    const newLocomotiveField = locomotiveField.filter((elem) => elem.id !== id);
    setLocomotiveField(newLocomotiveField);
    incrementHandWithColor(color);
  };

  const locomotives = (
    <>
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
      />
      {locomotiveField.map((elem, index) => (
        <FieldLocomotiveCard
          key={index}
          color={elem.color}
          id={elem.id}
          onClick={handleCardClick}
        />
      ))}
    </>
  );

  return <div className={css["card-section"]}>{locomotives}</div>;
};

const mapStatToProps = (state) => ({
  deck: state.deck,
  locomotiveField: state.locomotiveField,
  playerLocomotivesInHand: state.playerLocomotivesInHand,
});

const mapDispatchToProps = {
  setLocomotiveField,
  setPlayerLocomotivesInHand,
};

export default connect(mapStatToProps, mapDispatchToProps)(CardSection);
