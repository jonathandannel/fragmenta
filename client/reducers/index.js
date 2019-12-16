import { combineReducers } from "redux";
import auth from "./auth";
import other from "./other";

const rootReducer = combineReducers({
  auth,
  other
});

export default rootReducer;
