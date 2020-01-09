import { createElement as h, useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Fab
} from "@material-ui/core";

import { splashStyles } from "./styles";

import Register from "./Auth/Register";
import Login from "./Auth/Login";

const Splash = () => {
  const styles = splashStyles();

  const [loginDialog, setLoginDialog] = useState(false);
  const [registerDialog, setRegisterDialog] = useState(false);

  return h(
    "main",
    { className: styles.main },
    h("div", { className: styles.splashImage }),
    h(
      "div",
      {
        className: styles.splashContent
      },
      h(Typography, { variant: "h1" }, "Travel document photos, simplified."),
      h(
        "div",
        {
          className: styles.loginActions
        },
        h(
          Fab,
          {
            variant: "contained",
            className: styles.loginButton,
            color: "primary",
            onClick: () => setRegisterDialog(true)
          },
          "Register"
        ),
        h(
          Fab,
          {
            variant: "contained",
            color: "primary",
            className: styles.loginButton,
            onClick: () => setLoginDialog(true)
          },
          "Login"
        )
      )
    ),
    h(
      Dialog,
      {
        className: styles.loginDialog,
        open: loginDialog,
        onClose: () => setLoginDialog(false),
        maxWidth: "sm",
        fullWidth: true
      },
      h(Login, {
        closeLogin: () => setLoginDialog(false),
        openRegister: () => setRegisterDialog(true)
      })
    ),
    h(
      Dialog,
      {
        className: styles.loginDialog,
        open: registerDialog,
        onClose: () => setRegisterDialog(false),
        maxWidth: "sm",
        fullWidth: true
      },
      h(Register, {
        closeRegister: () => setRegisterDialog(false),
        openLogin: () => setLoginDialog(true)
      })
    )
  );
};

export default Splash;
