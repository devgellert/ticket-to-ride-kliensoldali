import React from "react";
import { useEffect, useState } from "react";
import { ticketToRideData as data } from "../../../../../../../../ticket-to-ride-data";
import css from "./CardSection.module.scss";
import { v4 as uuid } from "uuid";
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const CardSection = () => {
  const { destinations } = data;

  const [aimDeck, setAimDeck] = useState([]);
  const [locomotiveDeck, setLocomotiveDeck] = useState({
    purple: 12,
    white: 12,
    blue: 12,
    yellow: 12,
    orange: 12,
    black: 12,
    red: 12,
    green: 12,
    // TODO mozdony
  });
  const [locomotiveField, setLocomotiveField] = useState([]);

  const handlePutLocomotivesToField = () => {
    const MAX_COUNT = 5;
    const newLocomotiveField = [];
    while (newLocomotiveField.length < MAX_COUNT) {
      const keys = window.Object.keys(locomotiveDeck);
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

  return (
    <div className={css["card-section"]}>
      <div className={css["title-wrap"]}>
        <h2>Célok:</h2>
      </div>
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
      />
      <div className={css["title-wrap"]}>
        <h2>Vasutak:</h2>
      </div>
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
      />

      {locomotiveField.map((elem) => (
        <FieldLocomotiveCard
          color={elem.color}
          id={elem.id}
          onClick={(id) => {
            // remove card with id
            const newLocomotiveField = locomotiveField.filter(
              (elem) => elem.id !== id
            );
            setLocomotiveField(newLocomotiveField);
          }}
        />
      ))}
    </div>
  );
};

export default CardSection;
