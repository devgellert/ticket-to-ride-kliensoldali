import React from "react";
import { useEffect } from "react";
import css from "./BottomNav.module.scss";
import PlayerCardsWrap from "./components/player_cards_wrap/PlayerCardsWrap";
import PlayerAimCard from "./components/player_aim_card/PlayerAimCard";
import PlayerLocomotiveCard from "./components/player_locomotive_card/PlayerLocomotiveCard";
import { connect } from "react-redux";
import shuffle from "../../../../../../utils/shuffle";
import { setPlayerLocomotivesInHand } from "../../../../../../redux/actions";
//

const BottomNav = ({
  playerLocomotivesInHand,
  deck,
  setPlayerLocomotivesInHand,
  destinations,
}) => {
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
    const newHand = { ...playerLocomotivesInHand };
    for (let i = 0; i < MAX_COUNT; i++) {
      const keys = window.Object.keys(deck);
      const shuffledKeys = shuffle(keys);
      const newKey = shuffledKeys[0];
      newHand[newKey]++;
    }

    setPlayerLocomotivesInHand(newHand);
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
        {playerDestinations.map((aim) => (
          <PlayerAimCard
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
        {Object.keys(playerLocomotivesInHand).map((key) => (
          <PlayerLocomotiveCard
            color={key}
            quantity={playerLocomotivesInHand[key]}
          />
        ))}
      </PlayerCardsWrap>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  playerLocomotivesInHand: state.playerLocomotivesInHand,
  deck: state.deck,
  destinations: state.destinations,
});

const mapDispatchToProps = {
  setPlayerLocomotivesInHand,
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);
