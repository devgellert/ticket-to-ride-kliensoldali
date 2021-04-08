import React from "react";
import { useEffect } from "react";
import css from "./BottomNav.module.scss";
import PlayerCardsWrap from "./components/player_cards_wrap/PlayerCardsWrap";
import PlayerAimCard from "./components/player_aim_card/PlayerAimCard";
import PlayerLocomotiveCard from "./components/player_locomotive_card/PlayerLocomotiveCard";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import shuffle from "../../../../../../utils/shuffle";
import { setPlayerLocomotivesInHand } from "../../../../../../redux/actions";
//

const BottomNav = ({
  playerLocomotivesInHand,
  locomotiveDeck,
  setPlayerLocomotivesInHand,
}) => {
  const testAims = [
    { from: "Dallas", to: "New York" },
    { from: "London", to: "New York" },
    { from: "Dallas", to: "New York" },
    { from: "Dallas", to: "New York" },
  ];

  const handleInitialLocomotivesInHand = () => {
    const MAX_COUNT = 5;
    const newLocomotiveDeck = { ...locomotiveDeck };
    while (newLocomotiveDeck.length < MAX_COUNT) {
      const keys = window.Object.keys(locomotiveDeck);
      const shuffledKeys = shuffle(keys);
      const newKey = shuffledKeys[0];
      newLocomotiveDeck[newKey]++;
    }
    setPlayerLocomotivesInHand(newLocomotiveDeck);
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
        {testAims.map((aim) => (
          <PlayerAimCard {...aim} />
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
  locomotiveDeck: state.locomotiveDeck,
});

const mapDispatchToProps = {
  setPlayerLocomotivesInHand,
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);
