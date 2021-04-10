import React from "react";
import { useState } from "react";
import Element from "./components/element/Element";

const Connection = ({ connection, imgWrapRef }) => {
  const { elements } = connection;
  const [isHovered, setIsHovered] = useState(false);

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
        />
      ))}
    </div>
  );
};

export default Connection;
