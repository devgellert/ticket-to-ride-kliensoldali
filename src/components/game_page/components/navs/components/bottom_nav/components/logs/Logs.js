import React from "react";
import { useSelector } from "react-redux";
import roundEssentialSelectors from "../../../../../../../../redux/round/selectors/roundEssentialSelectors";
import css from "./Logs.module.scss";

const Logs = () => {
  const logs = useSelector(roundEssentialSelectors.getLogs);

  return (
    <div className={css["logs"]}>
      {logs.map((log) => (
        <>
          <div>{log}</div>
          <hr />
        </>
      ))}
    </div>
  );
};

export default Logs;
