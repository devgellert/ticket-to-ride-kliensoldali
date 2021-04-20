import { keys, map } from "lodash";
import { ticketToRideData as data } from "../../../ticket-to-ride-data";
import shuffle from "../../../utils/shuffle";

const createInitialDestinations = () => {
  return shuffle(map(keys(data.destinations), (id) => data.destinations[id]));
};

export default createInitialDestinations;
