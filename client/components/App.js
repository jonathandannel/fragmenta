import { createElement as h, useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";

import { verifyToken } from "../api";
import { setUser, setJwt } from "../actions/userActions";

import Splash from "./Splash";
import Main from "./Main";

const mapStateToProps = state => {
  return { user: state.auth.user };
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setJwt: token => dispatch(setJwt(token))
});

const App = ({ user, setUser, setJwt }) => {
  useEffect(() => {
    if (!user) {
      verifyToken().then(({ user, token }) => {
        if (user && token) {
          setUser(user);
          setJwt(token);
        }
      });
    }
  }, []);

  return h(
    HashRouter,
    null,
    !user ? h(Splash) : h(Main, { user, setUser, setJwt })
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
