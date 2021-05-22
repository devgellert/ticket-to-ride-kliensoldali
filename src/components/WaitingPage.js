import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
//
import { SocketContext } from "../SocketContext";
//
import css from "./WaitingPage.module.scss";
import { useSelector } from "react-redux";
import playersEssentialSelectors from "../redux/players/selectors/playersEssentialSelectors";

const WaitingPage = () => {
  const { roomId, isInRoom, connectedPlayers } = useContext(SocketContext);

  const players = useSelector(playersEssentialSelectors.getPlayers);

  if (!isInRoom) return <Redirect to="/main" />;

  return (
    <div className={css["waiting-page"]}>
      <h1>Szoba: {roomId}</h1>
      <ul>
        {players.map((player) => (
          <li>{player.name}</li>
        ))}
      </ul>
      <a href="/main">Vissza a főoldalra</a>
    </div>
  );
};

export default WaitingPage;
