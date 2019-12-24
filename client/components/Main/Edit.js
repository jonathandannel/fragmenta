import { createElement as h, useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { Button, Fab, Dialog, DialogContent } from "@material-ui/core";

import { loadModels } from "../../facialDetection";
import LoadingSpinner from "../LoadingSpinner";
import { editStyles } from "../styles";

const Edit = ({ userImages }) => {
  const styles = editStyles();

  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [editFromSelection, setEditFromSelection] = useState(null);
  const [choosing, setChoosing] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const chosenImage = useRef();
  const canvasOverlay = useRef();

  useEffect(() => {
    loadModels(setModelsLoaded);
  }, []);

  useEffect(() => {
    if (selectedImagePath) {
      detectAndDrawToCanvas();
    }
  }, [selectedImagePath]);

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

    const resizedResults = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );

    canvasOverlay.current.getContext("2d").drawImage(niceImage, 0, 0);
    faceapi.draw.drawDetections(canvasOverlay.current, resizedResults);
    faceapi.draw.drawFaceLandmarks(canvasOverlay.current, resizedResults);
  };

  return !modelsLoaded
    ? h(LoadingSpinner, { className: styles.spinner })
    : h(
        "div",
        {
          className: styles.mainContainer
        },
        selectedImagePath &&
          h(
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
                DialogContent,
                null,
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
            )
          : null
      );
};

export default Edit;
