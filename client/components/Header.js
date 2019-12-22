import { createElement as h, useState, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  IconButton,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  Popper,
  Paper
} from "@material-ui/core";

import { Settings, ExitToApp, Face } from "@material-ui/icons";

import { headerStyles } from "./styles";

const Header = ({ user, setUser, setJwt, history }) => {
  const styles = headerStyles();
  const userMenuAnchor = useRef();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const logout = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem("jwt");
    history.push("/");
  };

  const loggedIn = user !== null;

  return h(
    AppBar,
    { className: styles.appBar, elevation: 1 },
    h(
      Toolbar,
      { className: styles.toolBar },
      h(
        Link,
        { className: styles.link, to: "/app" },
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
                  variant: "subtitle1"
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
            { className: styles.loginActions },
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
        Popper,
        {
          anchorEl: userMenuAnchor.current,
          open: userMenuOpen,
          onClose: () => setUserMenuOpen(false),
          role: undefined,
          className: styles.userMenuPopper
        },
        h(
          ClickAwayListener,
          { onClickAway: () => setUserMenuOpen(false) },
          h(
            Paper,
            {
              className: styles.userMenu
            },
            h(
              MenuList,
              {
                className: styles.userMenuList,
                autoFocusItem: userMenuOpen
              },
              h(
                MenuItem,
                { className: styles.userMenuItem, onClick: logout },
                h(ListItemIcon, null, h(ExitToApp)),
                "Logout"
              ),
              h(
                MenuItem,
                { className: styles.userMenuItem, onClick: logout },
                h(ListItemIcon, null, h(Face)),
                "Profile"
              )
            )
          )
        )
      )
    )
  );
};

export default withRouter(Header);
