import { compact, map, reduce } from "lodash";
//
import buildingEssentialSelectors from "../building/selectors/buildingEssentialSelectors";
import { buildSuccess } from "../actions";
import playersEssentialSelectors from "../players/selectors/playersEssentialSelectors";
import { cardTypes } from "../general/generalReducer";
import playersDerivativeSelectors from "../players/selectors/playersDerivativeSelectors";

const isLoco = (elem) => elem.type === "locomotive";

const cMap = (arr, cb) => compact(map(arr, cb));

const getLocoCount = (cards) =>
  reduce(cards, (acc, card) => (isLoco(card) ? acc + 1 : acc), 0);

const countType = (cards, type) =>
  reduce(cards, (acc, elem) => (elem.type === type ? acc + 1 : acc), 0);

const handleMaxGreyType = (cards, isType = false) => {
  let maxType = null;
  let max = 0;
  for (let type of cardTypes) {
    let count = 0;
    for (let card of cards) {
      if (card.type === type) {
        count++;
      }
    }
    if (count > max) {
      max = count;
      maxType = type;
    }
  }
  if (!isType) {
    return max;
  }

  return maxType;
};

const forNumber = (num, cb) => {
  for (let i = 0; i < num; i++) {
    cb();
  }
};

const dropType = (cards, type) =>
  cMap(cards, (card) => (card.type === type ? null : card));

const buildThunk = () => async (dispatch, getState) => {
  const state = getState();

  const activePlayer = playersEssentialSelectors.getActivePlayer(state);

  const selectedConnection = buildingEssentialSelectors.getSelectedConnection(
    state
  );
  if (!selectedConnection) return;

  const {
    color, // === type
    elements,
    locomotive: locomotivesNeeded = 0,
  } = selectedConnection;
  const isGray = color === "gray";
  const cardsNeeded = elements.length;
  const availableVagons = playersDerivativeSelectors.getActivePlayerAvailableVagons(
    state
  );
  if (availableVagons - cardsNeeded < 0) {
    return alert("Nincs elég vagon...");
  }
  const selectedCards = buildingEssentialSelectors.getSelectedCards(state);
  const locomotiveCount = getLocoCount(selectedCards);

  const isNotEnoughLoco =
    locomotivesNeeded > 0 && locomotiveCount < locomotivesNeeded;
  if (isNotEnoughLoco) return alert("Nincs elég mozdonyod");

  const colorCardsNeeded = cardsNeeded - locomotivesNeeded;
  const rightColorCount = !isGray
    ? countType(selectedCards, color)
    : handleMaxGreyType(selectedCards);
  const grayType = handleMaxGreyType(selectedCards, true);

  let moreLocosCount = 0;

  const isNotEnoughColorCard = rightColorCount < colorCardsNeeded;
  if (isNotEnoughColorCard) {
    const moreLocoNeeded = colorCardsNeeded - rightColorCount;
    const moreLocos = locomotiveCount - locomotivesNeeded;
    const isNoLocoEnough = moreLocos < moreLocoNeeded;
    if (isNoLocoEnough)
      return alert(
        `Több kell ebből a színből: ${
          !isGray ? color : grayType
        }, nem lehet pótolni elég mozdonnyal sem...`
      );
    moreLocosCount = moreLocos;
  }

  let cardsToPutBackToHand = [...selectedCards];

  const countOfColorsToDrop = colorCardsNeeded - locomotivesNeeded;

  forNumber(countOfColorsToDrop, () => {
    cardsToPutBackToHand = dropType(
      cardsToPutBackToHand,
      !isGray ? color : grayType
    );
  });

  const countOfLocosToDrop = locomotivesNeeded + moreLocosCount;
  forNumber(countOfLocosToDrop + moreLocosCount, () => {
    cardsToPutBackToHand = dropType(cardsToPutBackToHand, "locomotive");
  });

  dispatch(
    buildSuccess({
      cardsToPutBackToHand,
      selectedConnection: selectedConnection,
      log: `${activePlayer.name}: megépített egy utat ${selectedConnection.fromCity} és ${selectedConnection.toCity} között`,
    })
  );
};

export default buildThunk;
