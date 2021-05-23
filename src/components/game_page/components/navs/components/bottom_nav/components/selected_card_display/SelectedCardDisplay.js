import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { map, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
//
import buildingEssentialSelectors from "../../../../../../../../redux/building/selectors/buildingEssentialSelectors";
import buildThunk from "../../../../../../../../redux/thunks/buildThunk";
import cancelBuildThunk from "../../../../../../../../redux/thunks/cancelBuildThunk";
import unselectCardThunk from "../../../../../../../../redux/thunks/unselectCardThunk";
//
import css from "./SelectedCardDisplay.module.scss";
import { SocketContext } from "../../../../../../../../SocketContext";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";

const SelectedCardDisplay = () => {
  const dispatch = useDispatch();
  const { playerIndex } = useContext(SocketContext);
  const isMyTurn = useSelector((state) =>
    playersDerivativeSelectors.isMyTurn(state, playerIndex)
  );
  const selectedConnection = useSelector(
    buildingEssentialSelectors.getSelectedConnection
  );
  const selectedCards = useSelector(
    buildingEssentialSelectors.getSelectedCards
  );

  if (!selectedConnection) return null;

  const onBuildClick = () => dispatch(buildThunk());

  const onCancelClick = () => dispatch(cancelBuildThunk());

  const unselectCard = (type) => dispatch(unselectCardThunk(type));

  return createPortal(
    <div className={css["selected-card-display"]}>
      <h2>Építkezés</h2>
      <h4>Kiválasztott kártyák:</h4>

      {!!isEmpty(selectedCards) && <div>Válasszon kártyákat</div>}

      {map(selectedCards, (card, index) => (
        <p key={index}>
          {card.type}
          {!!isMyTurn && (
            <button onClick={() => unselectCard(card.type)}>Törlés</button>
          )}
        </p>
      ))}

      {!!isMyTurn && !isEmpty(selectedCards) && (
        <button onClick={onBuildClick}>Építés</button>
      )}
      {!!isMyTurn && <button onClick={onCancelClick}>Mégsem</button>}
    </div>,
    document.body
  );
};

export default SelectedCardDisplay;
