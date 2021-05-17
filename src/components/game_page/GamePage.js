import React, { useContext } from "react";
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
import roundDerivativeSelectors from "../../redux/round/selectors/roundDerivativeSelectors";
import playersDerivativeSelectors from "../../redux/players/selectors/playersDerivativeSelectors";
import roundActions from "../../redux/round/roundActions";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { SocketContext } from "../../SocketContext";

const GamePage = ({ history }) => {
  const deck = useSelector(generalEssentialSelectors.getDeck);
  const destinations = useSelector(generalEssentialSelectors.getDestinations);
  const players = useSelector(playersEssentialSelectors.getPlayers);
  const isRoundEnded = useSelector(roundEssentialSelectors.isRoundEnded);
  const dispatch = useDispatch();
  const isLastRoundNeeded = useSelector(
    playersDerivativeSelectors.getIsLastRoundNeeded
  );
  const isGameEnded = useSelector(roundDerivativeSelectors.isGameEnded);

  const { isInRoom } = useContext(SocketContext);

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
    dispatch(roundActions.pushLog({ value: "A játék elkezdődött" }));
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (isRoundEnded) {
      dispatch(prepareNextRound());

      if (isLastRoundNeeded) {
        dispatch(roundActions.setLastRoundsCount({ value: players.length }));
      }
    }
  }, [isRoundEnded]);

  useEffect(() => {
    if (isGameEnded) {
      history.push("/final");
    }
  }, [isGameEnded]);

  return (
    <div className={css["GamePage"]}>
      <Navs />
      <Map />

      {!isInRoom && <Redirect to="/main" />}
      {!!isInRoom && <Redirect to="/waiting" />}
    </div>
  );
};

export default withRouter(GamePage);
