import React, { useEffect } from "react";
import css from "./BottomNav.module.scss";
import PlayerCardsWrap from "./components/player_cards_wrap/PlayerCardsWrap";
import PlayerLocomotiveCard from "./components/player_locomotive_card/PlayerLocomotiveCard";
import { connect, useDispatch, useSelector } from "react-redux";
import { setPlayerHand } from "../../../../../../redux/actions";
import { map, keys } from "lodash";
import PlayerAimCard from "./components/player_aim_card/PlayerAimCard";
import playersDerivativeSelectors from "../../../../../../redux/players/selectors/playersDerivativeSelectors";
//

const BottomNav = ({ playerHand, deck, setPlayerHand, destinations }) => {
  const activePlayerCardTypeNumbers = useSelector(
    playersDerivativeSelectors.getActivePlayerCardTypeNumbers
  );
  const activePlayerDestinations = useSelector(
    playersDerivativeSelectors.getActivePlayerDestinations
  );
  const dispatch = useDispatch();

  // const playerDestinations = (() => {
  //   const keys = Object.keys(destinations);
  //   const res = [];
  //   for (let i = 0; i < keys.length && i < 6; i++) {
  //     res.push(destinations[keys[i]]);
  //   }
  //   return res;
  // })();

  // console.log(playerDestinations);

  useEffect(() => {
    console.log(activePlayerCardTypeNumbers);
  }, [activePlayerCardTypeNumbers]);

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

const mapStateToProps = (state) => ({
  playerHand: state.general.playerHand,
  deck: state.general.deck,
  destinations: state.general.destinations,
});

const mapDispatchToProps = {
  setPlayerHand,
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);
