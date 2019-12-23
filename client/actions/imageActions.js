import { ADD_IMAGE, SET_ALL_USER_IMAGES } from "../constants/ActionTypes";

export const addImage = image => ({ type: ADD_IMAGE, image });
export const setAllUserImages = images => ({ type: SET_ALL_IMAGES, images });
