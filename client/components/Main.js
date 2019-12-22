import { createElement as h } from "react";
import { Typography } from "@material-ui/core";

import { withRouter } from "react-router-dom";

import Header from "./Header";
import AppMenu from "./AppMenu";

import { appStyles } from "./styles";

const Main = ({ user, setUser, setJwt }) => {
  const styles = appStyles();

  return user
    ? h(
        "div",
        { className: styles.appWrapper },
        h(Header, { user, setUser, setJwt }),
        h(
          "div",
          { className: styles.splitPane },
          h(AppMenu),
          h(
            "div",
            { className: styles.main },
            h(Typography, { variant: "h6" }, `Welcome back, ${user.username}`)
          )
        )
      )
    : null;
};

export default withRouter(Main);
