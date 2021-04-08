import React from "react";
import { noop } from "lodash";
import css from "./FieldLocomotiveCard.module.scss";

const FieldLocomotiveCard = ({ color, onClick = noop, id }) => (
  <div
    className={css["field-locomotive-card"]}
    style={{ backgroundColor: color }}
    onClick={() => onClick(id)}
  />
);

export default FieldLocomotiveCard;
