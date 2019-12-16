import { createElement as h, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  lighten
} from "@material-ui/core";
import { loginFormStyles } from "./styles";
import useLoginForm from "../hooks/useLoginForm";
import { login } from "../api";

const Login = ({ setUser, setJwt }) => {
  const requestLogin = fieldValues =>
    login(fieldValues).then(({ message, success, token, user }) => {
      setSubmissionStatus({
        message,
        success,
        token
      });
      setUser(user);
      setJwt(token);
    });

  const styles = loginFormStyles();
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const { handleChange, handleSubmit } = useLoginForm(requestLogin);

  return h(
    "form",
    { className: styles.formContainer, onSubmit: handleSubmit },
    h(Typography, { variant: "h4", className: styles.title }, "Log in"),
    h(TextField, {
      name: "username",
      placeholder: "Username",
      onChange: handleChange
    }),
    h(TextField, {
      name: "password",
      type: "password",
      placeholder: "Password",
      onChange: handleChange
    }),
    submissionStatus &&
      h(
        Typography,
        { variant: "caption" },
        submissionStatus.message,
        submissionStatus.token
      ),
    h(
      "div",
      { className: styles.buttonContainer },
      h(
        Button,
        {
          type: "submit",
          className: styles.button
        },
        "Log in"
      )
    )
  );
};

export default Login;
