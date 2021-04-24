import buildingEssentialSelectors from "../../../../../../../redux/building/selectors/buildingEssentialSelectors";
import { compact, map } from "lodash";
import { buildSuccess } from "../../../../../../../redux/actions";
import mapConnectionLengthToPoints from "../../../../../../../utils/mapConnectionLengthToPoints";

const build = () => async (dispatch, getState) => {
  const state = getState();

  const selectedConnection = buildingEssentialSelectors.getSelectedConnection(
    state
  );
  if (!selectedConnection) return;

  const {
    color,
    elements,
    locomotive: locomotivesNeeded = 0,
  } = selectedConnection;
  const cardsNeeded = elements.length;
  const selectedCards = buildingEssentialSelectors.getSelectedCards(state);

  if (locomotivesNeeded > 0) {
    // check if enough locomotives
    // count locomotives
    const locomotiveCount = selectedCards.reduce(
      (acc, elem) => (elem.type === "locomotive" ? acc + 1 : acc),
      0
    );
    if (locomotiveCount < locomotivesNeeded) {
      alert("Nincs elég mozdonyod"); // TODO replace
      return;
    }
  }

  // check if enough cards
  const colorCardsNeeded = cardsNeeded - locomotivesNeeded;

  const rightColorCount = selectedCards.reduce(
    (acc, elem) => (elem.type === color ? acc + 1 : acc),
    0
  );
  if (rightColorCount < colorCardsNeeded) {
    alert(`Több kell ebből a színből: ${color}`); // TODO replace
    return;
  }

  // handle build
  let cardsToPutBackToHand = [...selectedCards];

  for (let i = 0; i < colorCardsNeeded; i++) {
    cardsToPutBackToHand = compact(
      map(cardsToPutBackToHand, (elem) => (elem.type === color ? null : elem))
    );
  }

  for (let i = 0; i < locomotivesNeeded; i++) {
    cardsToPutBackToHand = compact(
      map(cardsToPutBackToHand, (elem) =>
        elem.type === "locomotive" ? null : elem
      )
    );
  }

  dispatch(
    buildSuccess({
      cardsToPutBackToHand,
      selectedConnection: selectedConnection,
    })
  );
};

export default build;
