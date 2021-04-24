import React from "react";
import { createPortal } from "react-dom";
import css from "./SelectedCardDisplay.module.scss";
import { useSelector } from "react-redux";
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";

const SelectedCardDisplay = () => {
  const selectedConnection = useSelector(
    buildingEssentialSelectors.getSelectedConnection
  );
  const selectedCards = useSelector(
    buildingEssentialSelectors.getSelectedCards
  );

  if (!selectedConnection) return null;

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

      <button>Építés</button>
    </div>,
    document.body
  );
};

export default SelectedCardDisplay;
