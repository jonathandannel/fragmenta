import { createElement as h, useState } from "react";
import { connect } from "react-redux";
import { TextField, Button, Typography } from "@material-ui/core";
import { loginFormStyles } from "./styles";
import useLoginForm from "../hooks/useLoginForm";
import { login } from "../api";

import { setUser, setJwt } from "../actions/userActions";

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setJwt: token => dispatch(setJwt(token))
});

const Login = ({ setUser, setJwt }) => {
  const requestLogin = fieldValues =>
    login(fieldValues).then(({ message, token, user, success }) => {
      setSubmissionStatus({
        message
      });
      if (success) {
        setUser(user);
        setJwt(token);
      }
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
          color: "primary",
          variant: "contained",
          className: styles.button
        },
        "Log in"
      )
    )
  );
};

export default connect(null, mapDispatchToProps)(Login);
