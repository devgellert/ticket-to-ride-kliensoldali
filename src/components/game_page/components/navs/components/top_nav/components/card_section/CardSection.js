import React from "react";
import { useEffect, useState } from "react";
import { ticketToRideData as data } from "../../../../../../../../ticket-to-ride-data";
import css from "./CardSection.module.scss";
import { v4 as uuid } from "uuid";
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";
import { connect } from "react-redux";
import { compact } from "lodash";

import {
  setLocomotiveField,
  setPlayerHand,
} from "../../../../../../../../redux/actions";
import shuffle from "../../../../../../../../utils/shuffle";

const CardSection = ({
  deck,
  setLocomotiveField,
  locomotiveField,
  setPlayerHand,
  playerHand,
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

  const putCardInHand = (color) => {
    const newHand = { ...playerHand };
    if (newHand[color] !== 0 && !newHand[color])
      throw new Error("Cant draw that card...");

    newHand[color]++;

    setPlayerHand(newHand);
  };

  const removeCardFromField = (id) => {
    const deckKeys = Object.keys(deck);

    const validKeys = compact(
      deckKeys.map((key) => (deck[key] > 0 ? key : null))
    );
    if (validKeys.length === 0) return; // TODO handle empty deck
    const randomKey = shuffle(validKeys)[0];

    const newField = [
      ...locomotiveField.filter((elem) => elem.id !== id),
      { color: randomKey, id: uuid() },
    ];

    ///setLocomotiveField(newField);

    setLocomotiveField(newField);
  };

  const putNewCardToField = () => {
    const deckKeys = Object.keys(deck);
    const validKeys = compact(
      deckKeys.map((key) => (deck[key] > 0 ? key : null))
    );
    if (validKeys.length === 0) return; // TODO handle empty deck
    const randomKey = shuffle(validKeys)[0];

    const newField = [...locomotiveField, { color: randomKey, id: uuid() }];

    setLocomotiveField(newField);
  };

  const handleCardPick = async (card) => {
    const { id, color } = card;

    putCardInHand(color);
    removeCardFromField(id);
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 500);
    // });
    // putNewCardToField();
  };

  const handleCardClick = (id) => {
    const clickedElem = locomotiveField.find((elem) => elem.id === id);
    if (!clickedElem) return;

    console.log(clickedElem, locomotiveField);

    handleCardPick(clickedElem);
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
  playerHand: state.playerHand,
});

const mapDispatchToProps = {
  setLocomotiveField,
  setPlayerHand,
};

export default connect(mapStatToProps, mapDispatchToProps)(CardSection);
