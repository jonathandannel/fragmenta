import { createElement as h, useRef, useState, useEffect } from "react";
import { Button, Fab, Divider, Dialog, DialogContent } from "@material-ui/core";

import { uploadStyles } from "../styles";

import * as faceapi from "face-api.js";

import LoadingSpinner from "../LoadingSpinner";

const Edit = ({ userImages }) => {
  const styles = uploadStyles();

  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [editFromSelection, setEditFromSelection] = useState(null);
  const [choosing, setChoosing] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [drawingDone, setDrawingDone] = useState(false);

  const chosenImage = useRef();
  const canvasOverlay = useRef();

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    detectAndDrawToCanvas();
  }, [selectedImagePath]);

  const loadModels = async () => {
    await faceapi.loadTinyFaceDetectorModel("/weights");
    await faceapi.loadFaceLandmarkTinyModel("/weights");
    await faceapi.loadFaceRecognitionModel("/weights");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/weights");
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/weights");
    setModelsLoaded(true);
  };

  const detectAndDrawToCanvas = async () => {
    const niceImage = new Image(
      chosenImage.current.width,
      chosenImage.current.height
    );

    debugger;

    niceImage.crossOrigin = "anonymous";
    niceImage.src = selectedImagePath;

    const displaySize = { width: niceImage.width, height: niceImage.height };
    faceapi.matchDimensions(canvasOverlay.current, displaySize);

    const detectionsWithLandmarks = await faceapi
      .detectAllFaces(niceImage)
      .withFaceLandmarks();

    const resizedResults = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );

    canvasOverlay.current.getContext("2d").drawImage(niceImage, 0, 0);
    // Shows square with percentage chance of a face
    // faceapi.draw.drawDetections(canvasOverlay.current, resizedResults);
    faceapi.draw.drawFaceLandmarks(canvasOverlay.current, resizedResults);
    setDrawingDone();
  };

  return !modelsLoaded || (modelsLoaded && selectedImagePath && !drawingDone)
    ? h(LoadingSpinner)
    : h(
        "div",
        {
          className: styles.mainContainer
        },
        selectedImagePath &&
          h(
            "div",
            { style: { marginTop: "1rem", alignSelf: "center " } },
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
          ),
        choosing &&
          h(
            "div",
            {
              style: {
                width: "50%",
                alignSelf: "center",
                display: "flex",
                justifyContent: "space-evenly"
              }
            },
            h(
              Fab,
              {
                color: "secondary",
                variant: "contained",
                onClick: () => setEditFromSelection("gallery")
              },
              "Choose from uploads"
            ),
            h(Fab, { color: "secondary", variant: "contained" }, "Use webcam")
          ),
        editFromSelection === "gallery"
          ? h(
              Dialog,
              {
                open: editFromSelection === "gallery",
                onClose: () => setEditFromSelection(null)
              },
              h(
                "div",
                {
                  className: styles.uploadGallery
                },
                userImages.map(({ path }) =>
                  h(
                    Button,
                    {
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
          : null
      );
};

export default Edit;
