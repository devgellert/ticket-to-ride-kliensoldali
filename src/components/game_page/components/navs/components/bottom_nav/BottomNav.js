import React from "react";
import css from "./BottomNav.module.scss";
import PlayerCardsWrap from "./components/player_cards_wrap/PlayerCardsWrap";
import PlayerLocomotiveCard from "./components/player_locomotive_card/PlayerLocomotiveCard";
import { useSelector } from "react-redux";
import { map, keys } from "lodash";
import PlayerAimCard from "./components/player_aim_card/PlayerAimCard";
import playersDerivativeSelectors from "../../../../../../redux/players/selectors/playersDerivativeSelectors";
//

const BottomNav = () => {
  const activePlayerCardTypeNumbers = useSelector(
    playersDerivativeSelectors.getActivePlayerCardTypeNumbers
  );
  const activePlayerDestinations = useSelector(
    playersDerivativeSelectors.getActivePlayerDestinations
  );

  return (
    <nav className={css["bottom-nav"]}>
      <div className={css["header-wrap"]}>
        <h2>Célok:</h2>
      </div>
      <PlayerCardsWrap>
        {map(activePlayerDestinations, (destination, index) => (
          <PlayerAimCard
            key={index}
            from={destination.fromCity}
            to={destination.toCity}
            points={destination.value}
          />
        ))}
      </PlayerCardsWrap>

      <div className={css["header-wrap"]}>
        <h2>Vasutak:</h2>
      </div>
      <PlayerCardsWrap>
        {map(keys(activePlayerCardTypeNumbers), (type) => (
          <PlayerLocomotiveCard
            key={type}
            color={type}
            quantity={activePlayerCardTypeNumbers[type]}
          />
        ))}
      </PlayerCardsWrap>
    </nav>
  );
};

export default BottomNav;
