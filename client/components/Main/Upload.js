import { createElement as h } from "react";
import { Typography, Input } from "@material-ui/core";

import { appStyles } from "../styles";

const Upload = ({}) => {
  const styles = appStyles();
  return h("div", { style: { display: "flex", flexDirection: "column" } });
};

export default Upload;
