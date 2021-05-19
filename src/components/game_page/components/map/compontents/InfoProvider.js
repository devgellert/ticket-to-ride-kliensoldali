import React from "react";
import { createContext } from "react";

export const InfoContext = createContext(null);

const InfoProvider = ({ children }) => (
  <InfoContext.Provider
    value={{
      imgWidth: 800,
      imgHeight: 544,
      onePercentWidth: 800 / 100,
      onePercentHeight: 544 / 100,
    }}
  >
    {children}
  </InfoContext.Provider>
);

export default InfoProvider;
