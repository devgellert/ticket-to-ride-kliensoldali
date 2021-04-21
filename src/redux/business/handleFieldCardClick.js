import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import { map } from "lodash";
import playerActions from "../players/playersActions";

const handleFieldCardClick = (id) => async (dispatch, getState) => {
  const state = getState();

  const field = generalEssentialSelectors.getField(state);

  const clickedCard = field.find((elem) => elem.id === id);
  if (!clickedCard) return;

  const newField = field.filter((elem) => elem.id !== clickedCard.id);

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
    playerActions.cardDrawFromFieldSuccess({
      field: newField,
      players,
      points: clickedCard.points,
    })
  );
};

export default handleFieldCardClick;
