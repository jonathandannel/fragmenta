import { createElement as h, useRef, useState } from "react";
import { Typography, Input, Button, Fab } from "@material-ui/core";

import { Add } from "@material-ui/icons";

import { appStyles } from "../styles";

const Upload = ({ images, addImage }) => {
  const styles = appStyles();
  const inputRef = useRef();

  const [uploadStatus, setUploadStatus] = useState(null);

  const f = images;
  debugger;

  const handleFile = image => {
    const formData = new FormData();
    formData.append("image", image);

    fetch("api/images/upload", {
      method: "post",
      headers: { authorization: localStorage.getItem("jwt") },
      body: formData
    })
      .then(res => res.json())
      .then(({ success, message, path, image }) => {
        setUploadStatus(message);
        addImage(image);
      });
  };

  return h(
    "div",
    {
      style: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    },
    uploadStatus && h(Typography, { variant: "caption" }, uploadStatus),
    h(Typography, { variant: "caption" }, images.length),
    h(
      "form",
      {},
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
        h(Add),
        "Upload"
      )
    )
  );
};

export default Upload;
