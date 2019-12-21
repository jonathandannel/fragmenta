import { createElement as h, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon
} from "@material-ui/core";

import { Settings, Add } from "@material-ui/icons";

import { headerStyles } from "./styles";

const Header = ({ user, setUser, setJwt }) => {
  const styles = headerStyles();
  const userMenuAnchor = useRef();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const logout = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem("jwt");
  };

  const loggedIn = user !== null;

  return h(
    AppBar,
    { className: styles.appBar },
    h(
      Toolbar,
      { className: styles.toolBar },
      h(
        Link,
        { className: styles.link, to: "/" },
        h(
          Typography,
          { className: styles.logo, variant: "h5", color: "primary" },
          "myriad"
        )
      ),
      h("div", { className: styles.grow }),
      loggedIn
        ? h(
            "div",
            { className: styles.userInfo },
            h(
              "div",
              { className: styles.userName },
              h(
                Typography,
                {
                  className: styles.userNameText,
                  variant: "subtitle1",
                  color: "secondary"
                },
                user.username
              )
            ),
            h(
              IconButton,
              {
                ref: userMenuAnchor,
                onClick: () => setUserMenuOpen(true)
              },
              h(Settings)
            )
          )
        : h(
            "div",
            null,
            h(
              Link,
              { className: styles.link, to: "/register" },
              h(
                Button,
                {
                  className: styles.userAction,
                  variant: "contained",
                  color: "primary"
                },
                "Register"
              )
            ),
            h(
              Link,
              { className: styles.link, to: "/login" },
              h(
                Button,
                {
                  className: styles.userAction,
                  variant: "contained",
                  color: "primary"
                },
                "Login"
              )
            )
          ),
      h(
        Menu,
        {
          anchorEl: userMenuAnchor.current,
          open: userMenuOpen,
          onClose: () => setUserMenuOpen(false),
          className: styles.userMenu
        },
        h(
          MenuList,
          {
            className: styles.userMenuList
          },
          h(
            MenuItem,
            { className: styles.userMenuItem, onClick: logout },
            h(ListItemIcon, null, h(Add)),
            "Logout"
          ),
          h(
            MenuItem,
            { className: styles.userMenuItem, onClick: logout },
            h(ListItemIcon, null, h(Add)),
            "Profile"
          ),
          h(
            MenuItem,
            { className: styles.userMenuItem, onClick: logout },
            h(ListItemIcon, null, h(Add)),
            "Help"
          )
        )
      )
    )
  );
};

export default Header;
