import { createElement as h, useRef, useState, useEffect } from "react";
import {
  Button,
  Fab,
  Divider,
  Dialog,
  DialogContent,
  Snackbar
} from "@material-ui/core";

import { Add, Check } from "@material-ui/icons";

import { uploadStyles } from "../styles";

const Collection = ({ userUploads, addImage }) => {
  const styles = uploadStyles();
  const inputRef = useRef();

  const [selectedImagePath, setSelectedImagePath] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  return h(
    "div",
    {
      className: styles.mainContainer
    },
    h(Divider, { className: styles.divider }),
    h(
      "div",
      {
        className: styles.uploadGallery
      },
      userUploads.map(({ path, imageid }) =>
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

export default Collection;
