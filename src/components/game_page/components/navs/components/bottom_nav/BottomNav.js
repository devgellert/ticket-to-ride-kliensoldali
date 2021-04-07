import React from "react";
import css from "./BottomNav.module.scss";
import PlayerCardsWrap from "./components/player_cards_wrap/PlayerCardsWrap";
import PlayerAimCard from "./components/player_aim_card/PlayerAimCard";
import PlayerLocomotiveCard from "./components/player_locomotive_card/PlayerLocomotiveCard";
//

const BottomNav = () => {
  const testAims = [
    { from: "Dallas", to: "New York" },
    { from: "London", to: "New York" },
    { from: "Dallas", to: "New York" },
    { from: "Dallas", to: "New York" },
  ];

  const locomotiveCards = [
    { color: "lila", quantity: 1 },
    { color: "fehér", quantity: 1 },
    { color: "kék", quantity: 1 },
    { color: "sárga", quantity: 1 },
    { color: "narancs", quantity: 1 },
    { color: "fekete", quantity: 1 },
    { color: "piros", quantity: 1 },
    { color: "zöld", quantity: 1 },
    { color: "mozdony", quantity: 5 },
  ];

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
        <PlayerLocomotiveCard color={"Piros"} quantity={5} />
        {locomotiveCards.map((elem) => (
          <PlayerLocomotiveCard {...elem} />
        ))}
      </PlayerCardsWrap>
      <div></div>
    </nav>
  );
};

export default BottomNav;
