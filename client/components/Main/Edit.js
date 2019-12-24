import { createElement as h, useRef, useState, useEffect } from "react";
import { Button, Fab, Divider, Dialog, DialogContent } from "@material-ui/core";

import { uploadStyles } from "../styles";

import * as faceapi from "face-api.js";

const Edit = ({ userImages }) => {
  const styles = uploadStyles();

  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [editFromSelection, setEditFromSelection] = useState(null);
  const [choosing, setChoosing] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const chosenImage = useRef();

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    await faceapi.loadTinyFaceDetectorModel("/weights");
    await faceapi.loadFaceLandmarkTinyModel("/weights");
    await faceapi.loadFaceRecognitionModel("/weights");
    setModelsLoaded(true);
    console.log("models loaded");
  };

  const detect = async image => {
    const detectionsWithLandmarks = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks();

    console.log(detectionsWithLandmarks);
    debugger;
  };

  return h(
    "div",
    {
      className: styles.mainContainer
    },
    selectedImagePath &&
      h(
        "div",
        { style: { marginTop: "1rem", alignSelf: "center " } },
        h(Button, {
          color: "primary",
          onClick: () => detect(chosenImage.current)
        }),
        h("br"),
        h("br"),
        h("br"),
        h("img", { ref: chosenImage, src: selectedImagePath })
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
