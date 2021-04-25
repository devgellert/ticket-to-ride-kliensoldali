import generalEssentialSelectors from "./generalEssentialSelectors";

const { getDeck } = generalEssentialSelectors;

const isCardDeckEmpty = (state) => {
  const deck = getDeck(state);

  return deck.length === 0;
};

const generalDerivativeSelectors = {
  isCardDeckEmpty,
};

export default generalDerivativeSelectors;
