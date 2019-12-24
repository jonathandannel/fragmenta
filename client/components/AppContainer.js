import { createElement as h, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { setUser, setJwt } from "../actions/userActions";
import { verifyToken } from "../api";

import Splash from "./Splash";
import Main from "./Main/Main";
import { appStyles } from "./styles";

const mapStateToProps = state => {
  return { user: state.auth.user };
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setJwt: token => dispatch(setJwt(token))
});

const AppContainer = ({ user, setUser, setJwt, history }) => {
  const styles = appStyles();
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      verifyToken().then(({ user, token }) => {
        if (user && token) {
          history.push("/app");
          setUser(user);
          setJwt(token);
        } else {
          history.push("/");
        }
        setUserChecked(true);
      });
    }
  }, []);

  return !userChecked
    ? h(
        "div",
        {
          className: styles.spinnerContainer
        },
        h(
          "div",
          { className: styles.loadingSpinner },
          h(CircularProgress, {
            size: 90,
            thickness: 5,
            variant: "indeterminate",
            color: "primary"
          })
        )
      )
    : h(
        Switch,
        null,
        h(Route, { exact: true, path: "/" }, h(Splash)),
        h(
          Route,
          { path: "/app" },
          !user ? h(Splash) : h(Main, { user, setUser, setJwt })
        )
      );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
