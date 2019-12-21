import { createElement as h, useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
// import { appStyles } from "./styles";
import { Switch, Route, Link } from "react-router-dom";

import { appStyles, headerStyles } from "./styles";

import Register from "./Register";
import Login from "./Login";

const PageContent = ({ user, jwt }) => {
  const appStyle = appStyles();
  const headerStyle = headerStyles();
  return h(
    "main",
    { className: appStyle.main },
    h(
      "div",
      {
        style: {
          display: "flex",
          marginRight: "5rem",
          marginTop: "2rem",
          flexDirection: "column"
        }
      },
      h(Typography, { variant: "h1" }, "Create freely."),
      h(
        "div",
        {
          className: headerStyle.loginActions,
          style: { marginTop: "3rem", transform: "translateX(-1rem)" }
        },
        h(
          Link,
          { className: headerStyle.link, to: "/register" },
          h(
            Button,
            {
              className: headerStyle.userAction,
              variant: "contained",
              color: "primary"
            },
            "Register"
          )
        ),
        h(
          Link,
          { className: headerStyle.link, to: "/login" },
          h(
            Button,
            {
              className: headerStyle.userAction,
              variant: "contained",
              color: "primary"
            },
            "Login"
          )
        )
      )
    ),
    h(
      Switch,
      null,
      h(Route, { exact: true, path: "/register" }, h(Register)),
      h(Route, { exact: true, path: "/login" }, h(Login))
    )
  );
};

export default PageContent;
