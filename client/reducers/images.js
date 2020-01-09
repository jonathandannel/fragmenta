import {
  ADD_USER_UPLOAD,
  SET_ALL_USER_UPLOADS,
  ADD_FINISHED_PHOTO,
  SET_ALL_FINISHED_PHOTOS
} from "../constants/ActionTypes";

const initialState = {
  userUploads: [],
  finishedPhotos: []
};

const images = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USER_UPLOADS: {
      const { allUploads } = action;
      return {
        ...state,
        userUploads: allUploads
      };
    }
    case ADD_USER_UPLOAD: {
      const { upload } = action;
      const { userUploads } = state;
      return {
        ...state,
        userUploads: userUploads.concat(upload)
      };
    }
    case SET_ALL_FINISHED_PHOTOS: {
      debugger;
      const { allFinishedPhotos } = action;
      return {
        ...state,
        finishedPhotos: allFinishedPhotos
      };
    }
    case ADD_FINISHED_PHOTO: {
      const { photo } = action;
      const { finishedPhotos } = state;
      return {
        ...state,
        finishedPhotos: finishedPhotos.concat(photo)
      };
    }
    default:
      return { ...state };
  }
};

export default images;
