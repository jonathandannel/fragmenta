import { createElement as h, useRef, useState, useEffect } from "react";
import {
  Button,
  Fab,
  Divider,
  Dialog,
  DialogContent,
  Snackbar
} from "@material-ui/core";

import { uploadImage } from "../../api";

import { Add, Check } from "@material-ui/icons";

import { uploadStyles } from "../styles";

const Upload = ({ userImages, addImage }) => {
  const styles = uploadStyles();
  const inputRef = useRef();

  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFile = image => {
    setUploadStatus(null);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("final", false);
    uploadImage(formData).then(({ success, message, path, image }) => {
      if (success) {
        setUploadStatus(message);
        addImage(image);
      }
    });
  };

  return h(
    "div",
    {
      className: styles.mainContainer
    },
    h(
      "form",
      { className: styles.form },
      h("input", {
        ref: inputRef,
        type: "file",
        onChange: ({ target: { files } }) => handleFile(files[0]),
        style: { display: "none" }
      }),
      h(
        Fab,
        {
          variant: "extended",
          color: "secondary",
          onClick: () => inputRef.current.click()
        },
        h(Add, { className: styles.addIcon }),
        "Upload"
      )
    ),
    h(Divider, { className: styles.divider }),
    h(
      "div",
      {
        className: styles.uploadGallery
      },
      userImages.map(({ path, imageid }) =>
        h(
          Button,
          { key: imageid, onClick: () => setSelectedImagePath(path) },
          h("img", {
            className: styles.imageThumbnail,
            src: path
          })
        )
      )
    ),
    selectedImagePath &&
      h(
        Dialog,
        {
          open: selectedImagePath !== null,
          onClose: () => setSelectedImagePath(null)
        },
        h(DialogContent, {}, h("img", { src: selectedImagePath }))
      ),
    h(Snackbar, {
      style: { display: "flex", justifyContent: "center" },
      open: uploadStatus,
      autoHideDuration: 4000,
      onClose: () => setUploadStatus(null),
      anchorOrigin: {
        vertical: "top",
        horizontal: "center"
      },
      message: h(
        "div",
        { className: styles.confirmUploadContent },
        h(Check, { className: styles.checkIcon }),
        h(
          "span",
          { style: { paddingTop: "0.1rem" } },
          "Image successfully uploaded!"
        )
      )
    })
  );
};

export default Upload;
