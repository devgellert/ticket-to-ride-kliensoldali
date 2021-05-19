import React, { useContext } from "react";
import { useEffect } from "react";
import css from "./GamePage.module.scss";
import Navs from "./components/navs/Navs";
import Map from "./components/map/Map";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
//
import roundEssentialSelectors from "../../redux/round/selectors/roundEssentialSelectors";
import roundDerivativeSelectors from "../../redux/round/selectors/roundDerivativeSelectors";
import initGameThunk from "../../redux/thunks/initGameThunk";
import { SocketContext } from "../../SocketContext";
import handleNextRoundThunk from "../../redux/thunks/handleNextRoundThunk";

const GamePage = ({ history }) => {
  const isRoundEnded = useSelector(roundEssentialSelectors.isRoundEnded);
  const dispatch = useDispatch();
  const isGameEnded = useSelector(roundDerivativeSelectors.isGameEnded);

  const { isInRoom } = useContext(SocketContext);

  useEffect(() => {
    dispatch(initGameThunk());
  }, []);

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

  return (
    <div className={css["GamePage"]}>
      <Navs />
      <Map />

      {/*{!isInRoom && <Redirect to="/main" />}*/}
      {/*{!!isInRoom && <Redirect to="/waiting" />}*/}
    </div>
  );
};

export default withRouter(GamePage);
