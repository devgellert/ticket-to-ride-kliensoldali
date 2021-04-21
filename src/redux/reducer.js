import { combineReducers } from "redux";
import generalReducer from "./general/generalReducer";
import playersReducer from "./players/playersReducer";
import roundReducer from "./round/roundReducer";

const reducer = combineReducers({
  general: generalReducer,
  players: playersReducer,
  round: roundReducer,
});

export default reducer;
