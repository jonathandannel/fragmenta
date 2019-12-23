import { ADD_IMAGE, SET_ALL_USER_IMAGES } from "../constants/ActionTypes";

const initialState = {
  userImages: []
};

const images = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USER_IMAGES:
      const { images } = action;
      return {
        ...state,
        userImages: images
      };
    case ADD_IMAGE:
      const { image } = action;
      const { userImages } = state;
      return {
        ...state,
        userImages: [...userImages, image]
      };
    default:
      return { ...state };
  }
};

export default images;
