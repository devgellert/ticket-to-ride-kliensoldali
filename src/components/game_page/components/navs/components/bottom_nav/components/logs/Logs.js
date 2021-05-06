import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import roundEssentialSelectors from "../../../../../../../../redux/round/selectors/roundEssentialSelectors";
import css from "./Logs.module.scss";

const Logs = () => {
  const logs = useSelector(roundEssentialSelectors.getLogs);

  return (
    <div className={css["logs"]}>
      {logs.map((log, index) => (
        <Fragment key={index}>
          <div>{log}</div>
          <hr />
        </Fragment>
      ))}
    </div>
  );
};

export default Logs;
