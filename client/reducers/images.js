import { ADD_IMAGE } from "../constants/ActionTypes";

const initialState = {
  userImages: []
};

const images = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      const { image } = action;
      debugger;
      return {
        ...state,
        userImages: [...userImages, { ...image }]
      };
    default:
      return { ...state };
  }
};

export default images;
