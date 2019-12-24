import * as faceapi from "face-api.js";

export const loadModels = async loadedCb => {
  await faceapi.loadTinyFaceDetectorModel("/models");
  await faceapi.loadFaceLandmarkTinyModel("/models");
  await faceapi.loadFaceRecognitionModel("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  loadedCb(true);
};
