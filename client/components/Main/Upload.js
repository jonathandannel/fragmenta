import { createElement as h, useRef, useState } from "react";
import { Typography, Input, Button, Fab } from "@material-ui/core";

import { Add } from "@material-ui/icons";

import { appStyles } from "../styles";

const Upload = ({}) => {
  const inputRef = useRef();

  const handleFile = image => {
    const formData = new FormData();
    formData.append("image", image);

    fetch("api/images/upload", {
      method: "post",
      headers: { authorization: localStorage.getItem("jwt") },
      body: formData
    });
  };

  return h(
    "div",
    { style: { width: "75%", display: "flex", flexDirection: "column" } },
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
