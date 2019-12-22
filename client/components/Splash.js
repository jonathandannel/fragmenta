import { createElement as h, useState } from "react";
import { Typography, Button, Dialog } from "@material-ui/core";

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
    h(
      "div",
      {
        className: styles.splashContent
      },
      h(Typography, { variant: "h1" }, "Create freely."),
      h(
        "div",
        {
          className: styles.loginActions
        },
        h(
          Button,
          {
            variant: "contained",
            color: "primary",
            onClick: () => setRegisterDialog(true)
          },
          "Register"
        ),
        h(
          Button,
          {
            variant: "contained",
            color: "primary",
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
        onClose: () => setLoginDialog(false)
      },
      h(Login)
    ),
    h(
      Dialog,
      {
        className: styles.loginDialog,
        open: registerDialog,
        onClose: () => setRegisterDialog(false)
      },
      h(Register)
    )
  );
};

export default Splash;
