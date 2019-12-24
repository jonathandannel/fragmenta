import { createElement as h, useRef, useState } from "react";
import {
  Typography,
  Input,
  Button,
  Fab,
  Divider,
  Card,
  CardContent
} from "@material-ui/core";

import { Add } from "@material-ui/icons";

import { appStyles } from "../styles";

const Upload = ({ userImages, addImage }) => {
  const styles = appStyles();
  const inputRef = useRef();

  const [uploadStatus, setUploadStatus] = useState(null);

  const f = userImages;
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
        width: "90%",
        display: "flex",
        flexDirection: "column"
      }
    },
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
    ),
    h(Divider),
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }
      },
      userImages.map(({ path }) =>
        h(
          Card,
          { style: { width: 200, height: 200 } },
          h(
            CardContent,
            {},
            h("img", { style: { transform: "scale(0.8)" }, src: path })
          )
        )
      )
    )
  );
};

export default Upload;
