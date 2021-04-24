import React from "react";
import { createPortal } from "react-dom";
import css from "./SelectedCardDisplay.module.scss";
import { useDispatch, useSelector } from "react-redux";
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";
import build from "../../thunks/build";

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

  return createPortal(
    <div className={css["selected-card-display"]}>
      <h2>Kiválasztott kártyák</h2>
      {selectedCards.map((card) => {
        return (
          <p>
            {card.type} <button>Törlés</button>
          </p>
        );
      })}
      <button onClick={onBuildClick}>Építés</button>
    </div>,
    document.body
  );
};

export default SelectedCardDisplay;
