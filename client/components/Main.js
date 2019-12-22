import { createElement as h } from "react";
import { Typography } from "@material-ui/core";

import { withRouter, Route, Switch } from "react-router-dom";

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
            h(
              Switch,
              null,
              h(
                Route,
                { exact: true, path: "/app/edit" },
                h(Typography, { variant: "h2" }, "Edit")
              ),
              h(
                Route,
                { exact: true, path: "/app/upload" },
                h(Typography, { variant: "h6" }, "Upload")
              ),

              h(
                Route,
                { exact: true, path: "/app/collection" },
                h(Typography, { variant: "h6" }, "Collection")
              )
            )
          )
        )
      )
    : null;
};

export default withRouter(Main);
