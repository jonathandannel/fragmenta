import { SET_JWT, SET_USER } from "../constants/ActionTypes";

export const setJwt = jwt => ({ type: SET_JWT, jwt });

export const setUser = user => ({ type: SET_USER, user });
