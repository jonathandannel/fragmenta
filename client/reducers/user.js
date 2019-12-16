import { SET_USER, SET_JWT } from "../constants/ActionTypes";

const initialState = {
  user: {},
  jwt: ""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action;
      return {
        ...state,
        user
      };
    case SET_JWT:
      const { jwt } = action;
      return {
        ...state,
        jwt
      };
    default:
      return state;
  }
};

export default user;
