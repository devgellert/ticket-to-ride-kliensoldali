import React from "react";
import css from "./GamePage.module.scss";
import Navs from "./components/navs/Navs";
import Map from "./components/map/Map";
import { useDispatch, useSelector } from "react-redux";
import { keys, unset, forEach } from "lodash";

import generalSelectors from "../../redux/general/generalSelectors";
import shuffle from "../../utils/shuffle";
import playersSelectors from "../../redux/players/playersSelectors";
import { cardTypes } from "../../redux/general/generalReducer";
import playerActions from "../../redux/players/playersActions";
import generalActions from "../../redux/general/generalActions";

const getNormalizedDeck = (deck) => {
  const res = { ...deck };

  forEach(cardTypes, (color) => {
    if (res[color] !== 0) return;
    unset(res, color);
  });

  return res;
};

const GamePage = () => {
  const deck = useSelector(generalSelectors.getDeck);
  const players = useSelector(playersSelectors.getPlayers);
  const destinations = useSelector(generalSelectors.getDestinations);
  const dispatch = useDispatch();

  const getInitialPlayerCards = (deck) => {
    const MAX_COUNT = 5;

    const initialHand = [];
    for (let i = 0; i < MAX_COUNT; i++) {
      initialHand.push(deck.pop());
    }

    return initialHand;
  };

  const initPlayersHand = () => {
    let currentDeck = deck;
    // const newDestinationsDeck = { ...destinations };

    const newPlayers = players.map((player) => {
      // cards
      const initialCards = getInitialPlayerCards(currentDeck);

      // deckColors.forEach((color) => {
      //   if (!initialCards[color]) return;
      //   currentDeck[color] -= initialCards[color];
      // });

      // destinations

      // const initialPlayerDestinations = [];
      // for (let i = 0; i < 6; i++) {
      //   const randomKey = shuffle(keys(newDestinationsDeck))[0];
      //   initialPlayerDestinations.push(newDestinationsDeck[randomKey]);
      //   unset(newDestinationsDeck, randomKey);
      // }

      return {
        ...player,
        hand: {
          cards: initialCards,
          // destinations: initialPlayerDestinations,
        },
      };
    });

    dispatch(playerActions.setPlayers(newPlayers));
    dispatch(generalActions.setDeck(currentDeck));
    // dispatch(generalActions.setDestinations(newDestinationsDeck));
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
