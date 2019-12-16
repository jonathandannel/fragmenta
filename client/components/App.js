import { createElement as h } from "react";
import { connect } from "react-redux";

import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { AppBar, Button, Container, Typography } from "@material-ui/core";

import Register from "./Register";
import Login from "./Login";

import { appStyles } from "./styles";

import { setUser, setJwt } from "../actions/userActions";

const mapStateToProps = state => {
  return { user: state.auth.user, jwt: state.auth.jwt };
};

const mapDispatchToProps = dispatch => ({
  setUsers: user => dispatch(setUser(user)),
  setJwts: jwt => dispatch(setJwt(jwt))
});

const App = ({ user, jwt, setUsers, setJwts }) => {
  const styles = appStyles();

  const d = user;
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
        h(Typography, { variant: "h3" }, user),
        h(Typography, { variant: "h3" }, jwt),
        h(Link, { to: "/register" }, h(Button, null, "Register")),
        h(Link, { to: "/login" }, h(Button, null, "Login"))
      ),
      h(
        Switch,
        null,
        h(Route, { exact: true, path: "/register" }, h(Register)),
        h(
          Route,
          { exact: true, path: "/login" },
          h(Login, { setUsers, setJwts })
        )
      )
    )
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
