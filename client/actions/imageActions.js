import {
  ADD_USER_UPLOAD,
  ADD_FINISHED_PHOTO,
  SET_ALL_USER_UPLOADS,
  SET_ALL_FINISHED_PHOTOS
} from "../constants/ActionTypes";

export const addUpload = ({ singleUpload }) => ({
  type: ADD_USER_UPLOAD,
  singleUpload
});
export const setAllUserUploads = ({ allUploads }) => ({
  type: SET_ALL_USER_UPLOADS,
  allUploads
});
export const addFinishedPhoto = ({ singlePhoto }) => ({
  type: ADD_FINISHED_PHOTO,
  singlePhoto
});
export const setAllFinishedPhotos = ({ allPhotos }) => ({
  type: SET_ALL_FINISHED_PHOTOS,
  allPhotos
});
