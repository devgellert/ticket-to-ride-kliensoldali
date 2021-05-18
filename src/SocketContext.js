import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createContext } from "react";
import io from "socket.io-client";
import { isFunction } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import playerActions from "./redux/players/playersActions";
import playersEssentialSelectors from "./redux/players/selectors/playersEssentialSelectors";

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const players = useSelector(playersEssentialSelectors.getPlayers);
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [connectedPlayers, setConnectedPlayers] = useState([]);
  const [isRoomLeader, setIsRoomLeader] = useState(false);

  const createInitialPlayer = (name) => ({
    name: name,
    hand: {
      cards: [],
      destinations: [],
    },
    connections: [],
  });

  useEffect(() => {
    try {
      const socket = io("http://webprogramozas.inf.elte.hu:3031");
      setSocket(socket);

      socket.on("player-joined", (payload) => {
        dispatch(
          playerActions.setPlayers([
            ...players,
            createInitialPlayer("Rasputin"),
          ])
        );
      });

      socket.on("player-joined", ({ roomId, socketId }) => {
        setConnectedPlayers([...connectedPlayers, socketId]);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const createRoom = useCallback(
    (roomSize, name, cb) => {
      socket.emit("create-room", roomSize, (ack) => {
        setRoomId(ack.roomId);
        if (isFunction(cb)) cb();
        setIsRoomLeader(true);
        dispatch(playerActions.setPlayers([createInitialPlayer(name)]));
      });
    },
    [socket]
  );

  const joinRoom = useCallback(
    (roomId, cb) => {
      socket.emit("join-room", roomId, (ack) => {
        if (ack.status === "ok") {
          setRoomId(roomId);
          if (isFunction(cb)) cb(roomId);
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
      emit: socket.emit,
    }),
    [createRoom, roomId, joinRoom, connectedPlayers]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
