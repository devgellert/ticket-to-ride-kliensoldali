import getInitialFieldViaMutation from "./helpers/getInitialFieldViaMutation";
import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import playerActions from "../players/playersActions";
import generalActions from "../general/generalActions";
import roundActions from "../round/roundActions";
import getInitialPlayersViaMutation from "./helpers/getInitialPlayersViaMutation";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";

const initGameThunk = () => async (dispatch, getState) => {
  const state = getState();

  const deck = generalEssentialSelectors.getDeck(state);
  const destinations = generalEssentialSelectors.getDestinations(state);
  const players = playersEssentialSelectors.getPlayers(state);

  const mutatedDeck = [...deck];
  const mutatedDestinations = [...destinations];

  const newPlayers = getInitialPlayersViaMutation(
    mutatedDeck,
    mutatedDestinations,
    players
  );

  const newField = getInitialFieldViaMutation(mutatedDeck);

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

export default initGameThunk;
