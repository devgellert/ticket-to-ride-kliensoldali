import React from "react";
import { useEffect } from "react";
import css from "./GamePage.module.scss";
import Navs from "./components/navs/Navs";
import Map from "./components/map/Map";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import getInitialPlayerCardsViaMutation from "./helpers/getInitialPlayerCardsViaMutation";
import getInitialDestinationsViaMutation from "./helpers/getInitialDestinationsViaMutation";
import generalSelectors from "../../redux/general/generalSelectors";
import playersSelectors from "../../redux/players/playersSelectors";
import playerActions from "../../redux/players/playersActions";
import generalActions from "../../redux/general/generalActions";

const GamePage = () => {
  const deck = useSelector(generalSelectors.getDeck);
  const players = useSelector(playersSelectors.getPlayers);
  const destinations = useSelector(generalSelectors.getDestinations);
  const dispatch = useDispatch();

  const createInitialPlayersViaMutation = (deck, destinations) => {
    const currentDeck = [...deck];
    const newDestinations = [...destinations];

    return map(players, (player) => ({
      ...player,
      hand: {
        cards: getInitialPlayerCardsViaMutation(currentDeck),
        destinations: getInitialDestinationsViaMutation(newDestinations),
      },
    }));
  };

  const initGame = () => {
    const mutatedDeck = [...deck];
    const mutatedDestinations = [...destinations];

    const newPlayers = createInitialPlayersViaMutation(
      mutatedDeck,
      mutatedDestinations
    );

    dispatch(playerActions.setPlayers(newPlayers));
    dispatch(generalActions.setDeck(mutatedDeck));
    dispatch(generalActions.setDestinations(mutatedDestinations));
  };

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className={css["GamePage"]}>
      <Navs />
      <Map />
    </div>
  );
};

export default GamePage;
