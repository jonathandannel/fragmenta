import * as faceapi from "face-api.js";

export const loadModels = async loadedCb => {
  await faceapi.loadTinyFaceDetectorModel("/weights");
  await faceapi.loadFaceLandmarkTinyModel("/weights");
  await faceapi.loadFaceRecognitionModel("/weights");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/weights");
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/weights");
  loadedCb(true);
};
