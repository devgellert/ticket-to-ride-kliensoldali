import React, { useContext } from "react";
import { keys, map } from "lodash";
import { useSelector } from "react-redux";
//
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
import { SocketContext } from "../../../../../../../../SocketContext";
//
import PlayerLocomotiveCard from "../player_locomotive_card/PlayerLocomotiveCard";
import PlayerCardsWrap from "../player_cards_wrap/PlayerCardsWrap";
//
import css from "./Cards.module.scss";

const Cards = () => {
  const { playerIndex } = useContext(SocketContext);

  const playerCardTypeNumbers = useSelector((state) =>
    playersDerivativeSelectors.getPlayerCardTypeNumbers(state, playerIndex)
  );
  console.log(playerCardTypeNumbers);

  return (
    <>
      <div className={css["header-wrap"]}>
        <h2>Vasutak:</h2>
      </div>
      <PlayerCardsWrap>
        {map(keys(playerCardTypeNumbers), (type) => (
          <PlayerLocomotiveCard
            key={type}
            type={type}
            numbers={playerCardTypeNumbers[type]}
          />
        ))}
      </PlayerCardsWrap>
    </>
  );
};

export default Cards;
