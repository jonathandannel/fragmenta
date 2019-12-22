import { createElement as h } from "react";
import { Typography, Input } from "@material-ui/core";

import { appStyles } from "../styles";

const Upload = ({}) => {
  const styles = appStyles();
  return h(
    "div",
    { style: { display: "flex", flexDirection: "column" } },
    h(Typography, { variant: "h5" }, "Upload"),
    h(Input, { type: "file" })
  );
};

export default Upload;
