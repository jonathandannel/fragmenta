import { createElement as h } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  AppBar,
  Button,
  Avatar,
  Typography,
  Toolbar,
  Container
} from "@material-ui/core";

import { appStyles, headerStyles } from "./styles";

const Header = ({ user, setUser, setJwt }) => {
  const appStyle = appStyles();
  const headerStyle = headerStyles();

  const logout = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem("jwt");
  };

  const loggedIn = user !== null;
  debugger;

  return h(
    AppBar,
    { color: "" },
    h(
      Toolbar,
      { className: headerStyle.toolBar },
      h(
        Link,
        { className: appStyle.link, to: "/" },
        h(
          Typography,
          { className: headerStyle.logo, variant: "h5", color: "primary" },
          "myriad"
        )
      ),
      h("div", { className: headerStyles.grow }),
      loggedIn
        ? h(
            "div",
            { className: headerStyle.userInfo },
            h(
              Avatar,
              { color: "secondary", className: headerStyle.userAvatar },
              user.username && user.username[0]
            ),
            h(Typography, { variant: "h6" }, user.username)
          )
        : h(
            "div",
            null,
            h(
              Link,
              { className: appStyle.link, to: "/register" },
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
              { className: appStyle.link, to: "/login" },
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
          ),
      loggedIn &&
        h(
          Button,
          { className: appStyle.link, variant: "contained", onClick: logout },
          "Logout"
        )
    )
  );
};

export default Header;
