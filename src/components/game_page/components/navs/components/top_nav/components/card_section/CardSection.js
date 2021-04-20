import React from "react";
import { useEffect, useState } from "react";
import { ticketToRideData as data } from "../../../../../../../../ticket-to-ride-data";
import css from "./CardSection.module.scss";
import { v4 as uuid } from "uuid";
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";
import { connect, useDispatch, useSelector } from "react-redux";
import { compact } from "lodash";

import {
  setLocomotiveField,
  setPlayerHand,
} from "../../../../../../../../redux/actions";
import shuffle from "../../../../../../../../utils/shuffle";
import generalEssentialSelectors from "../../../../../../../../redux/general/selectors/generalEssentialSelectors";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
import playersEssentialSelectors from "../../../../../../../../redux/players/selectors/playersEssentialSelectors";
import playerActions from "../../../../../../../../redux/players/playersActions";

const CardSection = ({
  deck,
  setLocomotiveField,
  locomotiveField,
  setPlayerHand,
  playerHand,
}) => {
  const field = useSelector(generalEssentialSelectors.getField);
  const activePlayerCards = useSelector(
    playersEssentialSelectors.getActivePlayerCards
  );
  const prevPlayers = useSelector(playersEssentialSelectors.getPlayers);

  const dispatch = useDispatch();
  // const getRandomValidColorFromDeck = () => {
  //   const keys = window.Object.keys(deck);
  //   const shuffledKeys = shuffle(keys);
  //   return shuffledKeys[0];
  // };
  //
  // const handlePutLocomotivesToField = () => {
  //   const MAX_COUNT = 5;
  //   const newLocomotiveField = [];
  //   while (newLocomotiveField.length < MAX_COUNT) {
  //     const newKey = getRandomValidColorFromDeck();
  //     newLocomotiveField.push({
  //       color: newKey,
  //       id: uuid(),
  //     });
  //   }
  //   setLocomotiveField(newLocomotiveField);
  // };
  //
  // useEffect(() => {
  //   handlePutLocomotivesToField();
  // }, []);
  //
  // const putCardInHand = (color) => {
  //   const newHand = { ...playerHand };
  //   if (newHand[color] !== 0 && !newHand[color])
  //     throw new Error("Cant draw that card...");
  //
  //   newHand[color]++;
  //
  //   setPlayerHand(newHand);
  // };
  //
  // const handleField = (id) => {
  //   const deckKeys = Object.keys(deck);
  //
  //   const validKeys = compact(
  //     deckKeys.map((key) => (deck[key] > 0 ? key : null))
  //   );
  //   if (validKeys.length === 0) return; // TODO handle empty deck
  //   const randomKey = shuffle(validKeys)[0];
  //
  //   const newField = [
  //     ...locomotiveField.filter((elem) => elem.id !== id),
  //     { color: randomKey, id: uuid() },
  //   ];
  //
  //   setLocomotiveField(newField);
  // };
  //

  const handleCardClick = (id) => {
    const clickedCard = field.find((elem) => elem.id === id);
    if (!clickedCard) return;

    const newField = field.filter((elem) => elem.id !== clickedCard.id);

    dispatch(
      playerActions.cardDrawSuccess({
        field: newField,
        card: clickedCard,
        prevPlayers,
      })
    );
  };

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
