import React from "react";
import { createPortal } from "react-dom";
import css from "./SelectedCardDisplay.module.scss";
import { useDispatch, useSelector } from "react-redux";
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";
import build from "../../thunks/build";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
import buildingActions from "../../../../../../../../redux/building/buildingActions";
import { map, isEmpty, find, filter } from "lodash";

const SelectedCardDisplay = () => {
  const dispatch = useDispatch();
  const selectedConnection = useSelector(
    buildingEssentialSelectors.getSelectedConnection
  );
  const selectedCards = useSelector(
    buildingEssentialSelectors.getSelectedCards
  );

  if (!selectedConnection) return null;

  const onBuildClick = () => dispatch(build());

  const onCancelClick = () => {
    dispatch(async (dispatch, getState) => {
      const state = getState();
      const selectedCards = buildingEssentialSelectors.getSelectedCards(state);
      const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
        state
      );
      const newActivePlayerCards = [...activePlayerCards, ...selectedCards];

      dispatch(
        buildingActions.cancelBuildingSuccess({
          activePlayerCards: newActivePlayerCards,
        })
      );
    });
  };

  //TODO: separate
  const unselectCard = (type) => {
    dispatch(async (dispatch, getState) => {
      const state = getState();
      const selectedCards = buildingEssentialSelectors.getSelectedCards(state);
      const cardToUnselect = find(selectedCards, (card) => card.type === type);

      if (!cardToUnselect) throw new Error("No card found");

      const newSelectedCards = filter(
        selectedCards,
        (card) => card.id !== cardToUnselect.id
      );

      const activePlayerCards = playersDerivativeSelectors.getActivePlayerCards(
        state
      );

      const newActivePlayerCards = [...activePlayerCards, cardToUnselect];

      dispatch(
        buildingActions.unselectCardSuccess({
          activePlayerCards: newActivePlayerCards,
          selectedCards: newSelectedCards,
        })
      );
    });
  };

  return createPortal(
    <div className={css["selected-card-display"]}>
      <h2>Építkezés</h2>
      <h4>Kiválasztott kártyák:</h4>

      {!!isEmpty(selectedCards) && <div>Válasszon kártyákat</div>}
      {map(selectedCards, (card) => {
        return (
          <p>
            {card.type}{" "}
            <button onClick={() => unselectCard(card.type)}>Törlés</button>
          </p>
        );
      })}

      {!isEmpty(selectedCards) && (
        <button onClick={onBuildClick}>Építés</button>
      )}
      <button onClick={onCancelClick}>Mégsem</button>
    </div>,
    document.body
  );
};

export default SelectedCardDisplay;
