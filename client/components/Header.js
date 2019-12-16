import { createElement as h } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Typography } from "@material-ui/core";

import { appStyles } from "./styles";

const Header = ({ user, setUser, setJwt }) => {
  const styles = appStyles();

  const logout = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem("jwt");
  };

  return h(
    AppBar,
    { className: styles.appBar },
    user && h(Typography, { variant: "h5" }, user.username),
    h(Link, { to: "/register" }, h(Button, null, "Register")),
    h(Link, { to: "/login" }, h(Button, null, "Login")),
    h(Button, { onClick: logout }, "Logout")
  );
};

export default Header;
