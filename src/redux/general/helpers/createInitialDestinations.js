import { keys, map } from "lodash";
import { ticketToRideData as data } from "../../../ticket-to-ride-data";

const createInitialDestinations = () => {
  return map(keys(data.destinations), (id) => data.destinations[id]);
};

export default createInitialDestinations;
