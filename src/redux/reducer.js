import { combineReducers } from "redux";
import generalReducer from "./general/generalReducer";
import playersReducer from "./players/playersReducer";
import roundReducer from "./round/roundReducer";
import buildingReducer from "./building/buildingReducer";

const reducer = combineReducers({
  general: generalReducer,
  players: playersReducer,
  round: roundReducer,
  building: buildingReducer,
});

export default reducer;
