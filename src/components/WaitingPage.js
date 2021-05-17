import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import css from "./WaitingPage.module.scss";
import { SocketContext } from "../SocketContext";

const WaitingPage = () => {
  const { roomId, isInRoom, connectedPlayers } = useContext(SocketContext);

  if (!isInRoom) return <Redirect to="/main" />;

  return (
    <div className={css["waiting-page"]}>
      <h1>Szoba: {roomId}</h1>
      <ul>
        {connectedPlayers.map((id) => (
          <li>{id}</li>
        ))}
      </ul>
      <a href="/main">Vissza a főoldalra</a>
    </div>
  );
};

export default WaitingPage;
