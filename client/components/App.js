import { createElement as h, useEffect } from "react";
import { connect } from "react-redux";

import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { AppBar, Button, Container, Typography } from "@material-ui/core";

import { verifyToken } from "../api";
import { setUser } from "../actions/userActions";

import Register from "./Register";
import Login from "./Login";

import { appStyles } from "./styles";

const mapStateToProps = state => {
  return { user: state.auth.user };
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

const App = ({ user, setUser }) => {
  const styles = appStyles();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    if (!user) {
      verifyToken().then(({ user }) => {
        setUser(user);
      });
    }
  }, []);

  return h(
    BrowserRouter,
    null,
    h(
      AppBar,
      { className: styles.appBar },
      user && h(Typography, { variant: "h5" }, user.username),
      h(Link, { to: "/register" }, h(Button, null, "Register")),
      h(Link, { to: "/login" }, h(Button, null, "Login")),
      h(Button, { onClick: logout }, "Logout")
    ),
    h(
      "main",
      { className: styles.main },
      h(
        Switch,
        null,
        h(Route, { exact: true, path: "/register" }, h(Register)),
        h(Route, { exact: true, path: "/login" }, h(Login, { setUser }))
      )
    )
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
