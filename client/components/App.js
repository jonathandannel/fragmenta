import { createElement as h } from "react";

import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { AppBar, Button, Typography, Container } from "@material-ui/core";

import Register from "./Register";
import Login from "./Login";

import { appStyles } from "./styles";

const App = () => {
  const styles = appStyles();

  return h(
    BrowserRouter,
    null,
    h(
      "div",
      { className: styles.main },
      h(AppBar, { className: styles.appBar }),
      h(
        Container,
        {},
        h(Link, { to: "/register" }, h(Button, null, "Register")),
        h(Link, { to: "/login" }, h(Button, null, "Login"))
      ),
      h(
        Switch,
        null,
        h(Route, { exact: true, path: "/register" }, h(Register)),
        h(Route, { exact: true, path: "/login" }, h(Login))
      )
    )
  );
};

export default App;
