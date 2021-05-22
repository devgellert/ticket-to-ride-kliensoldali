import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createContext } from "react";
import { isFunction } from "lodash";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
//
import initGameThunk from "./redux/thunks/initGameThunk";
import { syncState } from "./redux/actions";
import playersEssentialSelectors from "./redux/players/selectors/playersEssentialSelectors";
import playerActions from "./redux/players/playersActions";

export const SocketContext = createContext(null);

export const SocketContextProvider = withRouter(({ children, history }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const connect = () => {
    const socket = io("http://webprogramozas.inf.elte.hu:3031");
    setSocket(socket);
    return socket;
  };

  useEffect(() => {
    try {
      const socket = connect();

      socket.on("state-changed", ({ roomId: _, state }) => {
        dispatch(syncState(state));
      });

      socket.on("room-is-full", ({ roomId, player, state }) => {
        history.push("/");
      });

      socket.on("player-left", async ({ roomId, socketId }) => {
        dispatch(async (dispatch, getState) => {
          const players = playersEssentialSelectors.getPlayers(getState());
          dispatch(playerActions.filterOutPlayerBySocketId(socketId));
          while (true) {
            await wait();
            const state = getState();
            if (state.players.players.length === players.length - 1) break;
          }
          const state = getState();
          socket.emit("sync-state", roomId, state, false, (args) => {
            console.log(args);
          });
        });
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const leaveRoom = () => {
    if (!roomId) return;

    socket.emit("leave-room", roomId, () => {
      console.log("Room left...");
    });
  };

  const wait = async () =>
    await new Promise((resolve) => setTimeout(resolve, 300));

  const createRoom = useCallback(
    (roomSize, name, cb) => {
      socket.emit("create-room", Number(roomSize), (ack) => {
        if (ack.status === "ok") {
          setRoomId(ack.roomId);
          if (isFunction(cb)) cb();

          dispatch(async (dispatch, getState) => {
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
            socket.emit("sync-state", ack.roomId, state, false, (args) => {
              console.log(args);
            });
          });
        }
      });
    },
    [socket]
  );

  const joinRoom = useCallback(
    (roomId, name, cb) => {
      socket.emit("join-room", roomId, ({ status, state }) => {
        if (status === "ok") {
          setRoomId(roomId);
          const parsedState = JSON.parse(state);
          dispatch(syncState(parsedState));

          dispatch(async (dispatch, getState) => {
            while (true) {
              await wait();
              const state = getState();
              if (state?.players?.players?.length ?? 0 > 0) break;
            }
            const state = getState();
            const oldPlayers = playersEssentialSelectors.getPlayers(state);
            const players = [
              ...oldPlayers,
              {
                name,
                hand: {
                  cards: [],
                  destinations: [],
                },
                connections: [],
                socketId: socket.id,
              },
            ];
            dispatch(playerActions.setPlayers(players));
            while (true) {
              await wait();
              const state = getState();
              if (state?.players?.players?.length === oldPlayers.length + 1)
                break;
            }
            socket.emit("sync-state", roomId, getState(), true, (args) => {
              console.log(args);
            });

            if (isFunction(cb)) cb(roomId);
          });
        }
      });
    },
    [socket]
  );

  const value = useMemo(
    () => ({
      createRoom,
      joinRoom,
      isInRoom: roomId !== null,
      roomId,
      leaveRoom,
    }),
    [createRoom, roomId, joinRoom, leaveRoom]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
});
