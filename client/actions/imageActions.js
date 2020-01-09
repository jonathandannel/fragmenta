import {
  ADD_USER_UPLOAD,
  ADD_FINISHED_PHOTO,
  SET_ALL_USER_UPLOADS,
  SET_ALL_FINISHED_PHOTOS
} from "../constants/ActionTypes";

export const addUpload = upload => ({
  type: ADD_USER_UPLOAD,
  upload
});
export const setAllUserUploads = allUploads => ({
  type: SET_ALL_USER_UPLOADS,
  allUploads
});
export const addFinishedPhoto = photo => ({
  type: ADD_FINISHED_PHOTO,
  photo
});
export const setAllFinishedPhotos = allFinishedPhotos => ({
  type: SET_ALL_FINISHED_PHOTOS,
  allFinishedPhotos
});
