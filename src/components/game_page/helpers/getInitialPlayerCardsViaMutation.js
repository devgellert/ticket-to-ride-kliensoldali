const getInitialPlayerCardsViaMutation = (deck) => {
  const MAX_COUNT = 5;

  const initialHand = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    initialHand.push(deck.pop());
  }

  return initialHand;
};

export default getInitialPlayerCardsViaMutation;
