import { combineReducers } from "redux";
import auth from "./auth";
import images from "./images";

const rootReducer = combineReducers({
  auth,
  images
});

export default rootReducer;
