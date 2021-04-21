import generalEssentialSelectors from "../general/selectors/generalEssentialSelectors";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import { map } from "lodash";
import playerActions from "../players/playersActions";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";

const handleFieldCardClick = (id) => async (dispatch, getState) => {
  const state = getState();

  const canDrawCard = playersDerivativeSelectors.canDrawCard(state);
  if (!canDrawCard) return;

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
    playerActions.cardDrawSuccess({
      field: newField,
      players,
    })
  );
};

export default handleFieldCardClick;
