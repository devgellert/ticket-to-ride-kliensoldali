import { filter, find } from "lodash";
//
import buildingEssentialSelectors from "../building/selectors/buildingEssentialSelectors";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";
import { unselectCardSuccess } from "../actions";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";

const unselectCardThunk = (type) => async (dispatch, getState) => {
  const state = getState();
  const selectedCards = buildingEssentialSelectors.getSelectedCards(state);
  const cardToUnselect = find(selectedCards, (card) => card.type === type);
  const activePlayer = playersEssentialSelectors.getActivePlayer(state);

  if (!cardToUnselect) throw new Error("No card found");

  const newSelectedCards = filter(
    selectedCards,
    (card) => card.id !== cardToUnselect.id
  );

  const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
    state
  );

  const newActivePlayerCards = [...activePlayerCards, cardToUnselect];

  dispatch(
    unselectCardSuccess({
      activePlayerCards: newActivePlayerCards,
      selectedCards: newSelectedCards,
      log: `${activePlayer.name}: ${cardToUnselect.type} kártya kiválasztása visszavonva`,
    })
  );
};

export default unselectCardThunk;
