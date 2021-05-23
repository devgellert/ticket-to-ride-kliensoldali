import { isFunction } from "lodash";
//
import playersEssentialSelectors from "../../players/selectors/playersEssentialSelectors";
import playerActions from "../../players/playersActions";
import wait from "../helpers/wait";
import generalEssentialSelectors from "../../general/selectors/generalEssentialSelectors";
import getInitialDestinationsViaMutation from "../helpers/getInitialDestinationsViaMutation";
import { joinSuccess } from "../../actions";

const handleJoinRoomThunk = (socket, name, roomId, cb) => async (
  dispatch,
  getState
) => {
  while (true) {
    await wait();
    const state = getState();
    if (state?.players?.players?.length ?? 0 > 0) break;
  }
  const state = getState();
  const oldPlayers = playersEssentialSelectors.getPlayers(state);
  const destinations = getInitialDestinationsViaMutation(
    generalEssentialSelectors.getDestinations(state)
  );

  const players = [
    ...oldPlayers,
    {
      name,
      hand: {
        cards: [],
        destinations,
      },
      connections: [],
      socketId: socket.id,
    },
  ];
  dispatch(joinSuccess({ players, destinations }));
  while (true) {
    await wait();
    const state = getState();
    if (state?.players?.players?.length === oldPlayers.length + 1) break;
  }
  socket.emit("sync-state", roomId, getState(), true, (args) => {
    console.log(args);
  });

  if (isFunction(cb)) cb(roomId);
};

export default handleJoinRoomThunk;
