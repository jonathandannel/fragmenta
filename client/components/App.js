import { createElement as h } from "react";
import { connect } from "react-redux";

import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { AppBar, Button, Container } from "@material-ui/core";

import Register from "./Register";
import Login from "./Login";

import { appStyles } from "./styles";

const mapStateToProps = state => {
  return { ...state };
};

const App = (...props) => {
  const styles = appStyles();
  debugger;

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

export default connect(mapStateToProps, null)(App);
