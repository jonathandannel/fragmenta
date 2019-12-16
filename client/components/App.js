import { createElement as h, useEffect } from "react";
import { connect } from "react-redux";

import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { AppBar, Button, Container, Typography } from "@material-ui/core";

import Register from "./Register";
import Login from "./Login";

import { verifyToken } from "../api";
import { appStyles } from "./styles";

import { setUser, setJwt } from "../actions/userActions";

const mapStateToProps = state => {
  return { user: state.auth.user, jwt: state.auth.jwt };
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setJwt: jwt => dispatch(setJwt(jwt))
});

const App = ({ user, jwt, setUser, setJwt }) => {
  const styles = appStyles();

  useEffect(() => {
    if (!user) {
      verifyToken().then(({ user }) => {
        setUser(user);
      });
    }
  }, [user]);

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
        user && h(Typography, { variant: "h5" }, user.username),
        h(Link, { to: "/register" }, h(Button, null, "Register")),
        h(Link, { to: "/login" }, h(Button, null, "Login"))
      ),
      h(
        Switch,
        null,
        h(Route, { exact: true, path: "/register" }, h(Register)),
        h(Route, { exact: true, path: "/login" }, h(Login, { setUser, setJwt }))
      )
    )
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
