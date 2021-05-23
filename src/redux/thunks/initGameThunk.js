import getInitialFieldViaMutation from "./helpers/getInitialFieldViaMutation";
import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import { initGameSuccess } from "../actions";

const initGameThunk = (name, socketId) => async (dispatch, getState) => {
  const state = getState();

  const deck = generalEssentialSelectors.getDeck(state);
  const mutatedDeck = [...deck];

  const newPlayers = [
    {
      name,
      hand: {
        cards: [],
        destinations: [],
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
    })
  );
};

export default initGameThunk;
