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

  return h(
    AppBar,
    { color: "" },
    h(
      Toolbar,
      { className: headerStyle.toolBar },
      loggedIn
        ? h(
            Container,
            { className: headerStyle.userInfo },
            h(
              Avatar,
              { color: "primary", className: headerStyle.userAvatar },
              user.username && user.username[0]
            ),
            h(Typography, { variant: "h5" }, user.username)
          )
        : h("div"),
      h("div", { className: headerStyles.grow }),
      !loggedIn
        ? h(
            "div",
            null,
            h(
              Link,
              { className: appStyle.link, to: "/register" },
              h(
                Button,
                { className: headerStyle.userAction, color: "primary" },
                "Register"
              )
            ),

            h(
              Link,
              { className: appStyle.link, to: "/login" },
              h(
                Button,
                { className: headerStyle.userAction, color: "primary" },
                "Login"
              )
            )
          )
        : h(
            Redirect,
            { to: "/" },
            h(Button, { className: appStyle.link, onClick: logout }, "Logout")
          )
    )
  );
};

export default Header;
