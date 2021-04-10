import React from "react";
import { useEffect } from "react";
import css from "./BottomNav.module.scss";
import PlayerCardsWrap from "./components/player_cards_wrap/PlayerCardsWrap";
import PlayerAimCard from "./components/player_aim_card/PlayerAimCard";
import PlayerLocomotiveCard from "./components/player_locomotive_card/PlayerLocomotiveCard";
import { connect } from "react-redux";
import shuffle from "../../../../../../utils/shuffle";
import { setPlayerHand } from "../../../../../../redux/actions";
//

const BottomNav = ({ playerHand, deck, setPlayerHand, destinations }) => {
  const playerDestinations = (() => {
    const keys = Object.keys(destinations);
    const res = [];
    for (let i = 0; i < keys.length && i < 6; i++) {
      res.push(destinations[keys[i]]);
    }
    return res;
  })();
  //console.log(destinations, playerDestinations);

  const handleInitialLocomotivesInHand = () => {
    const MAX_COUNT = 5;
    const newHand = { ...playerHand };
    for (let i = 0; i < MAX_COUNT; i++) {
      const keys = window.Object.keys(deck);
      const shuffledKeys = shuffle(keys);
      const newKey = shuffledKeys[0];
      newHand[newKey]++;
    }

    setPlayerHand(newHand);
  };

  useEffect(() => {
    handleInitialLocomotivesInHand();
  }, []);

  return (
    <nav className={css["bottom-nav"]}>
      <div className={css["header-wrap"]}>
        <h2>Célok:</h2>
      </div>
      <PlayerCardsWrap>
        {playerDestinations.map((aim, index) => (
          <PlayerAimCard
            key={index}
            from={aim.fromCity}
            to={aim.toCity}
            points={aim.value}
          />
        ))}
      </PlayerCardsWrap>

      <div className={css["header-wrap"]}>
        <h2>Vasutak:</h2>
      </div>
      <PlayerCardsWrap>
        {Object.keys(playerHand).map((key) => (
          <PlayerLocomotiveCard
            key={key}
            color={key}
            quantity={playerHand[key]}
          />
        ))}
      </PlayerCardsWrap>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  playerHand: state.playerHand,
  deck: state.deck,
  destinations: state.destinations,
});

const mapDispatchToProps = {
  setPlayerHand,
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);
