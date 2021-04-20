const getInitialDestinationsViaMutation = (destinations) => {
  const initialPlayerDestinations = [];
  for (let i = 0; i < 6; i++) {
    initialPlayerDestinations.push(destinations.pop());
  }
  return initialPlayerDestinations;
};

export default getInitialDestinationsViaMutation;
