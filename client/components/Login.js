import { createElement as h, useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import { loginFormStyles } from './styles';
import useForm from '../hooks/useForm';

const Login = () => {
  const requestLogin = fieldValues => {
    fetch('/users/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldValues),
    })
      .then(res => res.json())
      .then(({ message, success, token }) => {
        localStorage.setItem('token', token);
        console.log(token);
        setSubmissionStatus({
          message,
          success,
          token,
        });
      });
  };

  const styles = loginFormStyles();
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const { handleChange, handleSubmit } = useForm({
    cb: requestLogin,
    formType: 'login',
  });

  return h(
    'form',
    { className: styles.formContainer, onSubmit: handleSubmit },
    h(Typography, { variant: 'h4', className: styles.title }, 'Log in'),
    h(TextField, {
      name: 'username',
      placeholder: 'Username',
      onChange: handleChange,
    }),
    h(TextField, {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      onChange: handleChange,
    }),
    submissionStatus &&
      h(
        Typography,
        { variant: 'caption' },
        submissionStatus.message,
        submissionStatus.token,
      ),
    h(
      'div',
      { className: styles.buttonContainer },
      h(
        Button,
        {
          type: 'submit',
          className: styles.button,
        },
        'Log in',
      ),
    ),
  );
};

export default Login;
