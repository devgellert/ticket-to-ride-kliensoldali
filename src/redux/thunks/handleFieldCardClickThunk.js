import { map } from "lodash";
import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import playerActions from "../players/playersActions";
import { compact } from "lodash";
import { cardDrawFromFieldSuccess } from "../actions";

const handleFieldCardClickThunk = (id) => async (dispatch, getState) => {
  const state = getState();

  const activePlayer = playersEssentialSelectors.getActivePlayer(state);

  const field = generalEssentialSelectors.getField(state);

  const clickedCard = field.find((elem) => elem.id === id);
  if (!clickedCard) return;

  const deck = generalEssentialSelectors.getDeck(state);
  const newCardFromDeck = deck.pop();

  const newField = compact(
    map(field, (elem) => (elem.id !== clickedCard.id ? elem : newCardFromDeck))
  );

  const prevPlayers = playersEssentialSelectors.getPlayers(state);
  const activePlayerIndex = playersEssentialSelectors.getActivePlayerIndex(
    getState()
  );

  const players = map(prevPlayers, (player, index) => {
    if (activePlayerIndex !== index) return player;

    return {
      ...player,
      hand: {
        ...player.hand,
        cards: [...player.hand.cards, clickedCard],
      },
    };
  });

  dispatch(
    cardDrawFromFieldSuccess({
      field: newField,
      players,
      points: clickedCard.points,
      deck,
      log: `${activePlayer.name}: ${clickedCard.type} kártya felhúzva a mezőről.`,
    })
  );
};

export default handleFieldCardClickThunk;
