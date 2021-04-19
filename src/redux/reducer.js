import { combineReducers } from "redux";
import generalReducer from "./general/generalReducer";
import playersReducer from "./players/playersReducer";

const reducer = combineReducers({
  general: generalReducer,
  players: playersReducer,
});

export default reducer;
