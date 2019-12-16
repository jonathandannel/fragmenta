import { combineReducers } from "redux";
import user from "./user";
import other from "./other";

const rootReducer = combineReducers({
  user,
  other
});

export default rootReducer;
