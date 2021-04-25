import React from "react";
import PlayerCardsWrap from "../player_cards_wrap/PlayerCardsWrap";
import { keys, map } from "lodash";
import { useSelector } from "react-redux";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
import css from "./Cards.module.scss";
import PlayerLocomotiveCard from "../player_locomotive_card/PlayerLocomotiveCard";

const Cards = () => {
  const activePlayerCardTypeNumbers = useSelector(
    playersDerivativeSelectors.getActivePlayerCardTypeNumbers
  );

  return (
    <>
      <div className={css["header-wrap"]}>
        <h2>Vasutak:</h2>
      </div>
      <PlayerCardsWrap>
        {map(keys(activePlayerCardTypeNumbers), (type) => (
          <PlayerLocomotiveCard key={type} type={type} />
        ))}
      </PlayerCardsWrap>
    </>
  );
};

export default Cards;
