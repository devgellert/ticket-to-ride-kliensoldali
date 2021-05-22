import getInitialFieldViaMutation from "./helpers/getInitialFieldViaMutation";
import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import playerActions from "../players/playersActions";
import generalActions from "../general/generalActions";
import roundActions from "../round/roundActions";

const initGameThunk = (name) => async (dispatch, getState) => {
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
    },
  ];

  const newField = getInitialFieldViaMutation(mutatedDeck);

  dispatch(playerActions.setPlayers(newPlayers));
  dispatch(
    generalActions.initGameSuccess({
      deck: mutatedDeck,
      field: newField,
    })
  );
  dispatch(roundActions.pushLog({ value: "A játék elkezdődött" }));
};

export default initGameThunk;
