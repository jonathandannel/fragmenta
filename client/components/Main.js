import { createElement as h } from "react";
import { Typography } from "@material-ui/core";

import Header from "./Header";

import { appStyles } from "./styles";

const Main = ({ user, setUser, setJwt }) => {
  const styles = appStyles();

  return h(
    "div",
    { className: styles.appWrapper },
    h(Header, { user, setUser, setJwt }),
    h(
      "div",
      { className: styles.main },
      h(Typography, { variant: "h6" }, `Welcome back, ${user.username}`)
    )
  );
};

export default Main;
