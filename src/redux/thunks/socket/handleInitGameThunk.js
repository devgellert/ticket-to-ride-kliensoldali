import initGameThunk from "../initGameThunk";
import { MESSAGES } from "../../../SocketContext";
import wait from "../helpers/wait";

const handleInitGameThunk = (name, socket, roomId) => async (
  dispatch,
  getState
) => {
  dispatch(initGameThunk(name, socket.id));
  while (true) {
    await wait();
    const state = getState();
    if (state.players.players.length > 0) {
      // TODO: better state validation
      break;
    }
  }
  const state = getState();
  socket.emit(MESSAGES.SYNC_STATE, roomId, state, false, (args) => {
    console.log(args);
  });
};

export default handleInitGameThunk;
