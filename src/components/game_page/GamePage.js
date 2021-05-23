import React, { useContext } from "react";
import { useEffect } from "react";
import css from "./GamePage.module.scss";
import Navs from "./components/navs/Navs";
import Map from "./components/map/Map";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
//
import roundEssentialSelectors from "../../redux/round/selectors/roundEssentialSelectors";
import roundDerivativeSelectors from "../../redux/round/selectors/roundDerivativeSelectors";
import { SocketContext } from "../../SocketContext";
import handleNextRoundThunk from "../../redux/thunks/handleNextRoundThunk";

const GamePage = ({ history }) => {
  const isRoundEnded = useSelector(roundEssentialSelectors.isRoundEnded);
  const dispatch = useDispatch();
  const isGameEnded = useSelector(roundDerivativeSelectors.isGameEnded);

  const { isInRoom, isGameStarted } = useContext(SocketContext);

  useEffect(() => {
    if (isRoundEnded) {
      dispatch(handleNextRoundThunk());
    }
  }, [isRoundEnded]);

  useEffect(() => {
    if (isGameEnded) {
      history.push("/final");
    }
  }, [isGameEnded]);

  if (!isGameStarted) {
    return <Redirect to={isInRoom ? "/waiting" : "/main"} />;
  }

  return (
    <div className={css["GamePage"]}>
      <Navs />
      <Map />
    </div>
  );
};

export default withRouter(GamePage);
