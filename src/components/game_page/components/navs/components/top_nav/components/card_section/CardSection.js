import React from "react";
import { useEffect, useState } from "react";
import { ticketToRideData as data } from "../../../../../../../../ticket-to-ride-data";
import css from "./CardSection.module.scss";
import PlayerAimCard from "../../../bottom_nav/components/player_aim_card/PlayerAimCard";

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

  useEffect(() => {
    const keys = window.Object.keys(destinations);
    const shuffledKeys = shuffle(keys);

    const newAimDeck = [];
    shuffledKeys.forEach((key) => {
      newAimDeck.push(destinations[key]);
    });
    setAimDeck(newAimDeck);
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

      <PlayerAimCard />
      <PlayerAimCard />
      <PlayerAimCard />
      <PlayerAimCard />
    </div>
  );
};

export default CardSection;
