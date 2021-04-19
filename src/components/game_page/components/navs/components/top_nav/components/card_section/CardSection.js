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
  const getRandomValidColorFromDeck = () => {
    const keys = window.Object.keys(deck);
    const shuffledKeys = shuffle(keys);
    return shuffledKeys[0];
  };

  const handlePutLocomotivesToField = () => {
    const MAX_COUNT = 5;
    const newLocomotiveField = [];
    while (newLocomotiveField.length < MAX_COUNT) {
      const newKey = getRandomValidColorFromDeck();
      newLocomotiveField.push({
        color: newKey,
        id: uuid(),
      });
    }
    setLocomotiveField(newLocomotiveField);
  };

  useEffect(() => {
    handlePutLocomotivesToField();
  }, []);

  const putCardInHand = (color) => {
    const newHand = { ...playerHand };
    if (newHand[color] !== 0 && !newHand[color])
      throw new Error("Cant draw that card...");

    newHand[color]++;

    setPlayerHand(newHand);
  };

  const handleField = (id) => {
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

    setLocomotiveField(newField);
  };

  const handleCardPick = async (card) => {
    const { id, color } = card;

    putCardInHand(color);
    handleField(id);
  };

  const handleCardClick = (id) => {
    const clickedElem = locomotiveField.find((elem) => elem.id === id);
    if (!clickedElem) return;

    handleCardPick(clickedElem);
  };

  const locomotives = (
    <>
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
        onClick={() => {
          putCardInHand(getRandomValidColorFromDeck());
        }}
      />
      {/*{locomotiveField.map((elem, index) => (*/}
      {/*  <FieldLocomotiveCard*/}
      {/*    key={index}*/}
      {/*    color={elem.color}*/}
      {/*    id={elem.id}*/}
      {/*    onClick={handleCardClick}*/}
      {/*  />*/}
      {/*))}*/}
    </>
  );

  return <div className={css["card-section"]}>{locomotives}</div>;
};

const mapStatToProps = (state) => ({
  deck: state.general.deck,
  locomotiveField: state.general.locomotiveField,
  playerHand: state.general.playerHand,
});

const mapDispatchToProps = {
  setLocomotiveField,
  setPlayerHand,
};

export default connect(mapStatToProps, mapDispatchToProps)(CardSection);
