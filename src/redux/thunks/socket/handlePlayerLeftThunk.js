import playersEssentialSelectors from "../../players/selectors/playersEssentialSelectors";
import playerActions from "../../players/playersActions";
import { MESSAGES } from "../../../SocketContext";
import wait from "../helpers/wait";

const handlePlayerLeftThunk = (socket, roomId, socketId) => async (
  dispatch
) => {
  dispatch(async (dispatch, getState) => {
    const players = playersEssentialSelectors.getPlayers(getState());
    dispatch(playerActions.filterOutPlayerBySocketId(socketId));
    while (true) {
      await wait();
      const state = getState();
      if (state.players.players.length === players.length - 1) break;
    }
    const state = getState();
    socket.emit(MESSAGES.SYNC_STATE, roomId, state, false, (args) => {
      console.log(args);
    });
  });
};

export default handlePlayerLeftThunk;
