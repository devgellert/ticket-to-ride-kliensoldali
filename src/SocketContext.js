import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createContext } from "react";
import io from "socket.io-client";
import { isFunction } from "lodash";

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [connectedPlayers, setConnectedPlayers] = useState([]);

  useEffect(() => {
    try {
      const socket = io("http://webprogramozas.inf.elte.hu:3031");
      setSocket(socket);

      socket.on("player-joined", (payload) => {
        console.log("player joined", payload);
      });

      socket.on("player-joined", ({ roomId, socketId }) => {
        setConnectedPlayers([...connectedPlayers, socketId]);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const createRoom = useCallback(
    (roomSize, cb) => {
      socket.emit("create-room", roomSize, (ack) => {
        setRoomId(ack.roomId);
        if (isFunction(cb)) cb();
      });
    },
    [socket]
  );

  const joinRoom = useCallback(
    (roomId, cb) => {
      socket.emit("join-room", roomId, (ack) => {
        if (ack.status === "ok") {
          setRoomId(roomId);
          console.log(ack);
          if (isFunction(cb)) cb();
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
    }),
    [createRoom, roomId, joinRoom, connectedPlayers]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
