import { createElement as h, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { verifyToken } from "../api";
import { setUser, setJwt } from "../actions/userActions";

import { CircularProgress } from "@material-ui/core";

import Splash from "./Splash";
import Main from "./Main";
import { appStyles } from "./styles";

const mapStateToProps = state => {
  return { user: state.auth.user };
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setJwt: token => dispatch(setJwt(token))
});

const App = ({ user, setUser, setJwt }) => {
  const styles = appStyles();
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      verifyToken().then(({ user, token }) => {
        if (user && token) {
          setUser(user);
          setJwt(token);
        }
        setUserChecked(true);
      });
    }
  }, []);

  return h(
    BrowserRouter,
    null,
    !userChecked
      ? h(
          "div",
          {
            className: styles.loadingSpinner
          },
          h(CircularProgress, {
            size: 90,
            thickness: 5,
            variant: "indeterminate",
            color: "primary"
          })
        )
      : !user
      ? h(Splash)
      : h(Main, { user, setUser, setJwt })
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
