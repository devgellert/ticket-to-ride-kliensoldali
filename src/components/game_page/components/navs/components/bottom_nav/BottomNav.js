import React from "react";
import css from "./BottomNav.module.scss";
import PlayerCardsWrap from "./components/player_cards_wrap/PlayerCardsWrap";
import PlayerLocomotiveCard from "./components/player_locomotive_card/PlayerLocomotiveCard";
import { useDispatch, useSelector } from "react-redux";
import { map, keys, compact } from "lodash";
import PlayerAimCard from "./components/player_aim_card/PlayerAimCard";
import playersDerivativeSelectors from "../../../../../../redux/players/selectors/playersDerivativeSelectors";
import buildingActions from "../../../../../../redux/building/buildingActions";
import playerActions from "../../../../../../redux/players/playersActions";
//

const BottomNav = () => {
  const dispatch = useDispatch();
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
            onClick={() => {
              dispatch(async (dispatch, getState) => {
                const state = getState();
                const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
                  state
                );
                let cardPicker = null;
                const newActivePlayerCards = compact(
                  map(activePlayerCards, (card) => {
                    if (card.type === type && cardPicker === null) {
                      cardPicker = card;
                      return null;
                    }
                    return card;
                  })
                );
                if (cardPicker === null)
                  throw new Error("No card in hand like this");

                dispatch(buildingActions.pushSelectedCard(cardPicker));
                dispatch(
                  playerActions.setActivePlayersCards(newActivePlayerCards)
                );
              });
            }}
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
