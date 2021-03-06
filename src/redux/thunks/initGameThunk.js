import getInitialFieldViaMutation from "./helpers/getInitialFieldViaMutation";
import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import { initGameSuccess } from "../actions";
import getInitialDestinationsViaMutation from "./helpers/getInitialDestinationsViaMutation";
import getInitialPlayerCardsViaMutation from "./helpers/getInitialPlayerCardsViaMutation";

const initGameThunk = (name, socketId) => async (dispatch, getState) => {
  const state = getState();

  const deck = generalEssentialSelectors.getDeck(state);
  const mutatedDeck = [...deck];

  const playerCards = getInitialPlayerCardsViaMutation(mutatedDeck);

  const destinations = getInitialDestinationsViaMutation(
    generalEssentialSelectors.getDestinations(state)
  );

  const newPlayers = [
    {
      name,
      hand: {
        cards: playerCards,
        destinations,
      },
      connections: [],
      socketId,
    },
  ];

  const newField = getInitialFieldViaMutation(mutatedDeck);

  dispatch(
    initGameSuccess({
      players: newPlayers,
      deck: mutatedDeck,
      field: newField,
      log: "A játék elkezdődött.",
      destinations,
    })
  );
};

export default initGameThunk;
