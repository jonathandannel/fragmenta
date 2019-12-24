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
  const [webcamStarted, setWebcamStarted] = useState(false);

  const chosenImage = useRef();
  const canvasOverlay = useRef();

  const webcamCanvasRef = useRef();
  const videoRef = useRef();

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

  // const handleVideo = stream => {
  //   console.log(stream);
  //   videoRef.current.srcObject = stream;
  // };

  useEffect(() => {
    if (useWebcam) {
      navigator.getUserMedia(
        { video: true },
        stream => (videoRef.current.srcObject = stream),
        err => console.error(err)
      );
      setWebcamStarted(true);
    }
  }, [useWebcam]);

  const drawWebcamCanvas = async () => {
    const displaySize = { width: 640, height: 480 };
    faceapi.matchDimensions(videoRef.current, displaySize);

    const detectionsWithLandmarks = await faceapi
      .detectSingleFace(videoRef.current)
      .withFaceLandmarks();

    if (!detectionsWithLandmarks) {
      setError(true);
      return;
    }

    const resizedResults = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );

    webcamCanvasRef.current.getContext("2d").clearRect(0, 0, 640, 480);
    faceapi.draw.drawDetections(webcamCanvasRef.current, resizedResults);
    faceapi.draw.drawFaceLandmarks(webcamCanvasRef.current, resizedResults);
  };

  useEffect(() => {
    if (webcamStarted) {
      setInterval(() => {
        drawWebcamCanvas();
      }, 300);
    }
  }, [webcamStarted]);

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
              drawWebcamCanvas();
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
              ref: webcamCanvasRef,
              style: { position: "absolute" }
            }),
            h("video", {
              ref: videoRef,
              width: 640,
              height: 480,
              autoPlay: true,
              muted: true
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
