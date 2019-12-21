import { createElement as h, useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@material-ui/core";
import { loginFormStyles } from "./styles";
import useRegisterForm from "../hooks/useRegisterForm";
import { register } from "../api";

const Register = () => {
  const requestRegistration = fieldValues => {
    setSubmissionStatus(false);
    register(fieldValues).then(({ message, success }) =>
      setSubmissionStatus({
        message,
        success
      })
    );
  };

  const styles = loginFormStyles();
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const { handleChange, handleSubmit, validationErrors } = useRegisterForm(
    requestRegistration
  );

  return h(
    "form",
    { className: styles.formContainer, onSubmit: handleSubmit },
    h(Typography, { variant: "h4", className: styles.title }, "Register "),
    h(TextField, {
      name: "username",
      placeholder: "Username",
      onChange: handleChange
    }),
    h(TextField, {
      name: "email",
      type: "email",
      placeholder: "Email",
      onChange: handleChange
    }),
    h(TextField, {
      name: "password",
      type: "password",
      placeholder: "Password",
      onChange: handleChange
    }),
    submissionStatus &&
      h(Typography, { variant: "caption" }, submissionStatus.message),
    validationErrors.length
      ? h(
          Typography,
          { color: "error", variant: "caption" },
          validationErrors.slice(-1)
        )
      : null,
    h(
      "div",
      { className: styles.buttonContainer },
      h(
        Button,
        {
          type: "submit",
          variant: "contained",
          color: "primary",
          className: styles.button
        },
        "Register"
      )
    )
  );
};

export default Register;
