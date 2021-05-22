import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createContext } from "react";
import io from "socket.io-client";
import { isFunction } from "lodash";
import { useDispatch } from "react-redux";
import initGameThunk from "./redux/thunks/initGameThunk";
import { syncState } from "./redux/actions";

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [connectedPlayers] = useState([]);

  const connect = () => {
    const socket = io("http://webprogramozas.inf.elte.hu:3031");
    setSocket(socket);
    return socket;
  };

  useEffect(() => {
    console.log("useEffect");
    try {
      const socket = connect();

      socket.on("state-changed", (args) => {
        console.log("state-changed", args);
        dispatch(syncState(args.state));
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const wait = async () =>
    await new Promise((resolve) => setTimeout(resolve, 300));

  const createRoom = useCallback(
    (roomSize, name, cb) => {
      socket.emit("create-room", Number(roomSize), (ack) => {
        if (ack.status === "ok") {
          setRoomId(ack.roomId);
          if (isFunction(cb)) cb();

          dispatch(async (dispatch, getState) => {
            dispatch(initGameThunk(name));
            while (true) {
              await wait();
              const state = getState();
              if (state.players.players.length > 0) {
                // TODO: better state validation
                break;
              }
            }
            const state = getState();
            socket.emit("sync-state", ack.roomId, state);
          });
        }
      });
    },
    [socket]
  );

  const joinRoom = useCallback(
    (roomId, cb) => {
      socket.emit("join-room", roomId, ({ status, state }) => {
        if (status === "ok") {
          setRoomId(roomId);
          if (isFunction(cb)) cb(roomId);

          dispatch(syncState(state));
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
      connectedPlayers,
      emit: () => {},
    }),
    [createRoom, roomId, joinRoom, connectedPlayers]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
