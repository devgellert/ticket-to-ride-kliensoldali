import React from "react";
import { useState } from "react";
import Element from "./components/element/Element";
import { useDispatch, useSelector } from "react-redux";
import { setBuildConnectionIds } from "../../../../../../redux/actions";

const Connection = ({ connection, imgWrapRef }) => {
  const dispatch = useDispatch();
  const buildConnectionIds = useSelector((state) => state.buildConnectionIds);

  const { elements } = connection;
  const [isHovered, setIsHovered] = useState(false);

  const buildConnection = () => {
    // TODO build by user

    const newBuildConnectionIds = [...buildConnectionIds, connection.id];

    dispatch(setBuildConnectionIds(newBuildConnectionIds));
  };

  return (
    <div>
      {elements.map((elem, index) => (
        <Element
          key={index}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          element={elem}
          imgWrapRef={imgWrapRef}
          color={connection.color}
          connectionId={connection.id}
          onClick={buildConnection}
        />
      ))}
    </div>
  );
};

export default Connection;
