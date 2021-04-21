import React from "react";
import { useEffect } from "react";
import css from "./GamePage.module.scss";
import Navs from "./components/navs/Navs";
import Map from "./components/map/Map";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import getInitialPlayerCardsViaMutation from "./helpers/getInitialPlayerCardsViaMutation";
import getInitialDestinationsViaMutation from "./helpers/getInitialDestinationsViaMutation";
import playerActions from "../../redux/players/playersActions";
import generalActions from "../../redux/general/generalActions";
import playersEssentialSelectors from "../../redux/players/selectors/playersEssentialSelectors";
import generalEssentialSelectors from "../../redux/general/selectors/generalEssentialSelectors";
import roundEssentialSelectors from "../../redux/round/selectors/roundEssentialSelectors";
import prepareNextRound from "../../redux/business/prepareNextRound";

const GamePage = () => {
  const deck = useSelector(generalEssentialSelectors.getDeck);
  const destinations = useSelector(generalEssentialSelectors.getDestinations);
  const players = useSelector(playersEssentialSelectors.getPlayers);
  const isRoundEnded = useSelector(roundEssentialSelectors.isRoundEnded);
  const dispatch = useDispatch();

  const createInitialPlayersViaMutation = (deck, destinations) =>
    map(players, (player) => ({
      ...player,
      hand: {
        cards: getInitialPlayerCardsViaMutation(deck),
        destinations: getInitialDestinationsViaMutation(destinations),
      },
    }));

  const createInitialFieldViaMutation = (deckToMutate) => {
    const result = [];
    const FIELD_SIZE = 5;
    for (let i = 0; i < FIELD_SIZE; i++) {
      result.push(deckToMutate.pop());
    }
    return result;
  };

  const initGame = () => {
    const mutatedDeck = [...deck];
    const mutatedDestinations = [...destinations];

    const newPlayers = createInitialPlayersViaMutation(
      mutatedDeck,
      mutatedDestinations
    );

    const newField = createInitialFieldViaMutation(mutatedDeck);

    dispatch(playerActions.setPlayers(newPlayers));
    dispatch(
      generalActions.initGameSuccess({
        deck: mutatedDeck,
        field: newField,
        destinations: mutatedDestinations,
      })
    );
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (isRoundEnded) {
      dispatch(prepareNextRound());
    }
  }, [isRoundEnded]);

  return (
    <div className={css["GamePage"]}>
      <Navs />
      <Map />
    </div>
  );
};

export default GamePage;
