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
import SelectedCardDisplay from "./components/selected_card_display/SelectedCardDisplay";
import buildingEssentialSelectors from "../../../../../../redux/building/selectors/buildingEssentialSelectors";
import selectCardForBuilding from "./thunks/selectCardForBuilding";
//

const BottomNav = () => {
  const dispatch = useDispatch();
  const activePlayerCardTypeNumbers = useSelector(
    playersDerivativeSelectors.getActivePlayerCardTypeNumbers
  );
  const activePlayerDestinations = useSelector(
    playersDerivativeSelectors.getActivePlayerDestinations
  );
  const selectedConnection = useSelector(
    buildingEssentialSelectors.getSelectedConnection
  );

  return (
    <>
      <SelectedCardDisplay />
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
          {map(keys(activePlayerCardTypeNumbers), (type) => {
            const onClick = () => dispatch(selectCardForBuilding(type));
            const isEmpty = activePlayerCardTypeNumbers[type] === 0;
            if (isEmpty) return null;

            const isDisabled = !selectedConnection;

            return (
              <PlayerLocomotiveCard
                isDisabled={isDisabled}
                onClick={onClick}
                key={type}
                color={type}
                quantity={activePlayerCardTypeNumbers[type]}
              />
            );
          })}
        </PlayerCardsWrap>
      </nav>
    </>
  );
};

export default BottomNav;
