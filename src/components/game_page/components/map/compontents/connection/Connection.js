import React, { useMemo } from "react";
import { useState } from "react";
import Element from "./components/element/Element";
import { useDispatch, useSelector } from "react-redux";
import roundDerivativeSelectors from "../../../../../../redux/round/selectors/roundDerivativeSelectors";
import playersDerivativeSelectors from "../../../../../../redux/players/selectors/playersDerivativeSelectors";
import buildingActions from "../../../../../../redux/building/buildingActions";
import buildingDerivativeSelectors from "../../../../../../redux/building/selectors/buildingDerivativeSelectors";
import { map } from "lodash";
import buildingEssentialSelectors from "../../../../../../redux/building/selectors/buildingEssentialSelectors";

const Connection = ({ connection, imgWrapRef }) => {
  const hoverConnectionIds = useSelector(
    buildingEssentialSelectors.getHoverConnectionIds
  );

  const isActive =
    hoverConnectionIds.includes(Number(connection.from)) ||
    hoverConnectionIds.includes(Number(connection.to));

  console.log("active:", isActive, hoverConnectionIds);

  const dispatch = useDispatch();

  const hasPointsToBuild = useSelector(
    roundDerivativeSelectors.hasPointsToBuild
  );
  const isBuilt = useSelector((state) =>
    playersDerivativeSelectors.getIsConnectionBuilt(state, connection.id)
  );
  const isConnectionSelected = useSelector((state) =>
    buildingDerivativeSelectors.getIsConnectionSelectedById(
      state,
      connection.id
    )
  );

  const { elements } = connection;
  const [isHovered, setIsHovered] = useState(false);

  const onClick = () =>
    dispatch(buildingActions.setSelectedConnection(connection));

  return (
    <>
      {map(elements, (elem, index) => (
        <Element
          isActive={isActive}
          isSelected={isConnectionSelected}
          isBuilt={isBuilt}
          isDisabled={!hasPointsToBuild || !!isBuilt}
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
