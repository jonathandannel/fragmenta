import * as faceapi from "face-api.js";

export const loadModels = async loadedCb => {
  // await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
  loadedCb(true);
};
