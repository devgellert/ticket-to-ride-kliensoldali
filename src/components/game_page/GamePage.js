import React from "react";
import css from "./GamePage.module.scss";
import Navs from "./components/navs/Navs";
import Map from "./components/map/Map";
import { useDispatch, useSelector } from "react-redux";
import { keys, cloneDeep, unset, forEach } from "lodash";

import generalSelectors from "../../redux/general/generalSelectors";
import shuffle from "../../utils/shuffle";
import playersSelectors from "../../redux/players/playersSelectors";
import { deckColors } from "../../redux/general/generalReducer";
import playerActions from "../../redux/players/playersActions";
import generalActions from "../../redux/general/generalActions";

const getNormalizedDeck = (deck) => {
  const res = { ...deck };

  forEach(deckColors, (color) => {
    if (res[color] !== 0) return;
    unset(res, color);
  });

  return res;
};

const GamePage = () => {
  const deck = useSelector(generalSelectors.getDeck);
  const players = useSelector(playersSelectors.getPlayers);
  const dispatch = useDispatch();

  const getInitialPlayerCards = (deck) => {
    const currentDeck = { ...deck };

    const MAX_COUNT = 5;
    const initialHand = {};

    for (let i = 0; i < MAX_COUNT; i++) {
      const normalizedDeck = getNormalizedDeck(currentDeck);
      const deckKeys = keys(normalizedDeck);
      const shuffledKeys = shuffle(deckKeys);
      const newKey = shuffledKeys[0];

      if (!initialHand[newKey]) {
        initialHand[newKey] = 1;
      } else {
        initialHand[newKey]++;
      }
      // delete 1 from deck
      currentDeck[newKey]--;
    }

    return initialHand;
  };

  const initPlayersHand = () => {
    let currentDeck = deck;

    csonst newPlayers = players.map((player) => {
      const initialCards = getInitialPlayerCards(currentDeck);
      const newHand = {
        ...player.hand,
        cards: initialCards,
      };

      deckColors.forEach((color) => {
        if (!initialCards[color]) return;
        currentDeck[color] -= initialCards[color];
      });

      return {
        ...player,
        hand: newHand,
      };
    });

    dispatch(playerActions.setPlayers(newPlayers));
    dispatch(generalActions.setDeck(currentDeck));
  };

  React.useEffect(() => {
    initPlayersHand();
  }, []);

  return (
    <div className={css["GamePage"]}>
      <Navs />
      <Map />
    </div>
  );
};

export default GamePage;
