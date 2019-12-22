import { createElement as h } from "react";
import { Typography } from "@material-ui/core";

import { appStyles } from "../styles";

const Upload = ({}) => {
  const styles = appStyles();
  return h(Typography, { variant: "h2" }, "Upload");
};

export default Upload;
