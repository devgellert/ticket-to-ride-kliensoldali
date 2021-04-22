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

  const canBuild = useSelector(roundDerivativeSelectors.canBuild);
  const isBuilt = useSelector((state) =>
    playersDerivativeSelectors.getIsConnectionBuilt(state, connection.id)
  );

  const { elements } = connection;
  const [isHovered, setIsHovered] = useState(false);

  const onClick = () =>
    dispatch(playerActions.pushToBuildConnectionIds({ id: connection.id }));

  return (
    <>
      {elements.map((elem, index) => (
        <Element
          isBuilt={isBuilt}
          isDisabled={!canBuild || !!isBuilt}
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
