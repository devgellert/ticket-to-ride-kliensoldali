import React from "react";
import { useState } from "react";
import Element from "./components/element/Element";
import { useDispatch, useSelector } from "react-redux";
import buildConnection from "../../../../../../redux/business/buildConnection";
import roundDerivativeSelectors from "../../../../../../redux/round/selectors/roundDerivativeSelectors";
import playersDerivativeSelectors from "../../../../../../redux/players/selectors/playersDerivativeSelectors";
import playerActions from "../../../../../../redux/players/playersActions";

const Connection = ({ connection, imgWrapRef }) => {
  const dispatch = useDispatch();

  const hasPointsToBuild = useSelector(
    roundDerivativeSelectors.hasPointsToBuild
  );
  const isBuilt = useSelector((state) =>
    playersDerivativeSelectors.getIsConnectionBuilt(state, connection.id)
  );
  const activePlayerHasEnoughCards = useSelector((state) =>
    playersDerivativeSelectors.activePlayerHasEnoughCards()
  );

  const { elements } = connection;
  const [isHovered, setIsHovered] = useState(false);

  // TODO: select path, and select cards after it
  //const [isSelected, setIsSelected] = useState(false);

  //const onClick = () => setIsSelected(true);
  const onClick = () => dispatch(buildConnection(connection.id));

  //if (isSelected) return null;

  return (
    <>
      {elements.map((elem, index) => (
        <Element
          isBuilt={isBuilt}
          isDisabled={
            !hasPointsToBuild || !!isBuilt // || !activePlayerHasEnoughCards
          }
          key={index}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          element={elem}
          imgWrapRef={imgWrapRef}
          color={connection.color}
          connectionId={connection.id}
          onClick={onClick}
        />
      ))}
    </>
  );
};

export default Connection;
