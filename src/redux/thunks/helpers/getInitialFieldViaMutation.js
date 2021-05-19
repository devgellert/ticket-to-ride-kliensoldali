const getInitialFieldViaMutation = (deckToMutate) => {
  const result = [];
  const FIELD_SIZE = 5;
  for (let i = 0; i < FIELD_SIZE; i++) {
    result.push(deckToMutate.pop());
  }
  return result;
};

export default getInitialFieldViaMutation;
