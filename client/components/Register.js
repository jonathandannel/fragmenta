import { createElement as h, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
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
    Paper,
    { elevation: 3, className: styles.formPaper },
    h(
      "form",
      { className: styles.formContainer, onSubmit: handleSubmit },
      h(TextField, {
        name: "username",
        placeholder: "Username",
        label: "Username",
        variant: "outlined",
        onChange: handleChange,
        className: styles.textField
      }),
      h(TextField, {
        name: "email",
        type: "email",
        placeholder: "Email",
        variant: "outlined",
        label: "Email",
        onChange: handleChange,
        className: styles.textField
      }),
      h(TextField, {
        name: "password",
        type: "password",
        placeholder: "Password",
        label: "Password",

        variant: "outlined",
        onChange: handleChange,

        className: styles.textField
      }),
      submissionStatus &&
        h(
          Typography,
          {
            variant: "caption",
            color: !submissionStatus.success ? "error" : ""
          },
          submissionStatus.message
        ),
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
    )
  );
};

export default Register;
