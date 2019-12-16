import { createElement as h } from "react";
import { connect } from "react-redux";

import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { AppBar, Button, Container } from "@material-ui/core";

import Register from "./Register";
import Login from "./Login";

import { appStyles } from "./styles";

import { setUser, setJwt } from "../actions/userActions";

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setJwt: jwt => dispatch(setJwt(jwt))
});

const App = ({ user, jwt }) => {
  const styles = appStyles();

  return h(
    BrowserRouter,
    null,
    h(
      "div",
      { className: styles.main },
      h(
        AppBar,
        { className: styles.appBar },
        h(Typography, { variant: "h3" }, user, jwt)
      ),
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
