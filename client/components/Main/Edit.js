import { createElement as h, useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";

import { connect } from "react-redux";

import {
  Button,
  Fab,
  Dialog,
  DialogContent,
  Typography,
  Divider,
  Paper
} from "@material-ui/core";
import { SaveAlt, CameraAlt, CloudUpload } from "@material-ui/icons";

import { loadModels } from "../../facialDetection";
import LoadingSpinner from "../LoadingSpinner";
import { editStyles } from "../styles";
import { uploadImage } from "../../api";

const Edit = ({ userUploads, addFinishedPhoto }) => {
  const styles = editStyles();

  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [editFromSelection, setEditFromSelection] = useState(null);
  const [choosing, setChoosing] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [stream, setStream] = useState(null);

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
      navigator.getUserMedia(
        { video: true },
        stream => {
          videoRef.current.srcObject = stream;
          setStream(stream);
        },
        err => console.error(err)
      );
      setWebcamStarted(true);
    }
  }, [useWebcam]);

  useEffect(() => {
    let interval;
    if (webcamStarted && modelsLoaded) {
      interval = setInterval(() => {
        drawWebcamCanvas();
      }, 100);
    }
    return () => clearInterval(interval);
  }, [webcamStarted, modelsLoaded]);

  const detectAndDrawToCanvas = async () => {
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

  const drawWebcamCanvas = async () => {
    const displaySize = { width: 720, height: 576 };
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

    webcamCanvasRef.current.getContext("2d").clearRect(0, 0, 720, 576);
    faceapi.draw.drawDetections(webcamCanvasRef.current, resizedResults);
    faceapi.draw.drawFaceLandmarks(webcamCanvasRef.current, resizedResults);
  };

  const takeWebcamPhoto = () => {
    const [screen] = stream.getVideoTracks();
    const capture = new ImageCapture(screen);

    capture.takePhoto().then(blob => {
      const newImage = new File([blob], `${Date.now()}`);
      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("final", true);
      uploadImage(formData).then(image => addFinishedPhoto(image));
    });
  };

  return !modelsLoaded
    ? h(LoadingSpinner, { className: styles.spinner })
    : h(
        "div",
        {
          className: styles.mainContainer
        },
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
                className: styles.fab,
                onClick: () => setEditFromSelection("gallery")
              },
              h(CloudUpload, {
                className: styles.fabIconLg
              }),
              "Choose from uploads"
            ),
            h(
              Fab,
              {
                color: "secondary",
                variant: "extended",
                className: styles.fab,
                onClick: () => {
                  setUseWebcam(true);
                  setChoosing(false);
                }
              },
              h(CameraAlt, { className: styles.fabIconLg }),
              "Use webcam"
            )
          ),
        h(
          "div",
          { className: styles.photoActions },
          useWebcam &&
            !choosing &&
            h(
              Fab,
              {
                variant: "extended",
                color: "secondary",
                className: styles.fab,
                onClick: takeWebcamPhoto
              },
              h(CameraAlt, { className: styles.fabIcon }),
              "Take photo"
            ),
          selectedImagePath &&
            !choosing &&
            h(
              Fab,
              {
                variant: "extended",
                color: "secondary",
                className: styles.fab,
                onClick: () => null
              },
              h(SaveAlt, { className: styles.fabIcon }),
              "Save"
            )
        ),
        h(Divider, { className: styles.divider }),
        useWebcam &&
          h(
            Paper,
            { elevation: 3, className: styles.webcamContainer },
            h("canvas", {
              width: 720,
              height: 576,
              ref: webcamCanvasRef,
              style: { position: "absolute" }
            }),
            h("video", {
              ref: videoRef,
              width: 720,
              height: 576,
              style: {
                objectFit: "cover"
              },
              autoPlay: true,
              muted: true
            })
          ),
        selectedImagePath && !error
          ? h(
              Paper,
              { elevation: 3, className: styles.imageOutput },
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
              !useWebcam &&
              h(
                Typography,
                { variant: "subtitle1", style: { alignSelf: "center" } },
                "Unable to find facial features in selected image."
              ),
        editFromSelection === "gallery"
          ? h(
              Dialog,
              {
                open: editFromSelection === "gallery",
                onClose: () => setEditFromSelection(null),
                maxWidth: "md",
                fullWidth: true
              },
              h(
                DialogContent,
                null,
                h(
                  "div",
                  {
                    className: styles.uploadGallery
                  },
                  userUploads.map(({ path, imageid }) =>
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
