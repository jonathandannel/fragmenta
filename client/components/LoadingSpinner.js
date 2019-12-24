import { createElement as h, useState } from "react";
import { CircularProgress } from "@material-ui/core";

import { appStyles } from "./styles";

const LoadingSpinner = () => {
  const styles = appStyles();

  return h(
    "div",
    { className: styles.loadingSpinner },
    h(CircularProgress, {
      size: 90,
      thickness: 5,
      variant: "indeterminate",
      color: "primary"
    })
  );
};

export default LoadingSpinner;
