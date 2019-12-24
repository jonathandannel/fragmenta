import { createElement as h, useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import {
  Button,
  Fab,
  Dialog,
  DialogContent,
  Typography
} from "@material-ui/core";

import { loadModels } from "../../facialDetection";
import LoadingSpinner from "../LoadingSpinner";
import { editStyles } from "../styles";

const Edit = ({ userImages }) => {
  const styles = editStyles();

  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [editFromSelection, setEditFromSelection] = useState(null);
  const [choosing, setChoosing] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);

  const [webcamScreenshot, setWebcamScreenshot] = useState(null);

  const chosenImage = useRef();
  const canvasOverlay = useRef();

  const webcamRef = useRef();
  const webcamCanvasRef = useRef();
  const webcamOverlayRef = useRef();
  const webcamScreenshotRef = useRef();

  useEffect(() => {
    loadModels(setModelsLoaded);
  }, []);

  useEffect(() => {
    if (selectedImagePath) {
      detectAndDrawToCanvas();
    }
  }, [selectedImagePath]);

  useEffect(() => {
    if (useWebcam) {
      setTimeout(() => {
        detectWebcam();
      }, 4000);
    }
  }, [useWebcam]);
  const detectAndDrawToCanvas = async (image, canvasRef) => {
    const niceImage = new Image(
      chosenImage.current.width,
      chosenImage.current.height
    );

    niceImage.crossOrigin = "anonymous";
    niceImage.src = selectedImagePath;

    const displaySize = { width: niceImage.width, height: niceImage.height };
    faceapi.matchDimensions(canvasOverlay.current, displaySize);

    const detectionsWithLandmarks = await faceapi
      .detectSingleFace(niceImage)
      .withFaceLandmarks();

    if (!detectionsWithLandmarks) {
      setError(true);
      return;
    }

    const resizedResults = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );

    canvasOverlay.current.getContext("2d").drawImage(niceImage, 0, 0);
    faceapi.draw.drawDetections(canvasOverlay.current, resizedResults);
    faceapi.draw.drawFaceLandmarks(canvasOverlay.current, resizedResults);
  };

  const takeScreen = async () => {
    const capture = await webcamRef.current.getScreenshot();
    setWebcamScreenshot(capture);
  };

  const drawWebcamCanvas = async () => {
    const niceImage = new Image(640, 480);
    niceImage.crossOrigin = "anonymous";
    niceImage.src = webcamScreenshotRef.current.src;

    webcamCanvasRef.current.getContext("2d").drawImage(niceImage, 0, 0);

    const displaySize = { width: 640, height: 480 };

    faceapi.matchDimensions(niceImage, displaySize);

    const detectionsWithLandmarks = await faceapi
      .detectSingleFace(niceImage)
      .withFaceLandmarks();

    if (!detectionsWithLandmarks) {
      setError(true);
      return;
    }

    const resizedResults = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );

    faceapi.draw.drawDetections(webcamCanvasRef.current, resizedResults);
    faceapi.draw.drawFaceLandmarks(webcamCanvasRef.current, resizedResults);
  };

  return !modelsLoaded
    ? h(LoadingSpinner, { className: styles.spinner })
    : h(
        "div",
        {
          className: styles.mainContainer
        },
        h(
          "button",
          {
            onClick: () => {
              takeScreen();
              setTimeout(() => {
                drawWebcamCanvas();
              }, 600);
            }
          },
          "cap"
        ),
        useWebcam &&
          h(
            "div",
            {
              // ref: webcamOverlayRef,
              // style: { width: 640, height: 480, position: "relative" }
            },
            h("canvas", {
              width: 640,
              height: 480,
              ref: webcamCanvasRef
            }),
            h(Webcam, {
              ref: webcamRef,
              audio: false,
              height: 480,
              screenshotFormat: "image/jpeg",
              videoConstraints: {
                width: 640,
                height: 480,
                facingMode: "user"
              }
            }),
            h("img", {
              ref: webcamScreenshotRef,
              src: webcamScreenshot
              // style: { display: "none" }
            })
          ),
        selectedImagePath && !error
          ? h(
              "div",
              { className: styles.imageOutput },
              h(
                "div",
                { className: styles.canvasContainer },
                h("canvas", {
                  ref: canvasOverlay
                }),
                h("img", {
                  ref: chosenImage,
                  style: { display: "none" },
                  src: selectedImagePath
                })
              )
            )
          : !choosing &&
              h(
                Typography,
                { variant: "subtitle1", style: { alignSelf: "center" } },
                "Unable to find facial features in selected image."
              ),
        choosing &&
          h(
            "div",
            {
              className: styles.choices
            },
            h(
              Fab,
              {
                color: "secondary",
                variant: "extended",
                onClick: () => setEditFromSelection("gallery")
              },
              "Choose from uploads"
            ),
            h(
              Fab,
              {
                color: "secondary",
                variant: "extended",
                onClick: () => {
                  setUseWebcam(true);
                  setChoosing(false);
                  // navigator.mediaDevices.enumerateDevices().then(async devices => {
                  //   const inputDevice = await devices.filter(
                  //     device => device.kind === 'videoinput'
                  //   );
                }
              },
              "Use webcam"
            )
          ),
        editFromSelection === "gallery"
          ? h(
              Dialog,
              {
                open: editFromSelection === "gallery",
                onClose: () => setEditFromSelection(null)
              },
              h(
                DialogContent,
                null,
                h(
                  "div",
                  {
                    className: styles.uploadGallery
                  },
                  userImages.map(({ path, imageid }) =>
                    h(
                      Button,
                      {
                        key: imageid,
                        onClick: () => {
                          setSelectedImagePath(path);
                          setEditFromSelection(null);
                          setChoosing(false);
                        }
                      },
                      h("img", {
                        className: styles.imageThumbnail,
                        src: path
                      })
                    )
                  )
                )
              )
            )
          : null
      );
};

export default Edit;
