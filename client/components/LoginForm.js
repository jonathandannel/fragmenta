import { createElement as h, useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import { loginFormStyles } from './styles';
import useForm from '../hooks/useForm';

const LoginForm = () => {
  const requestRegistration = fieldValues => {
    fetch('/users/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldValues),
    })
      .then(res => res.json())
      .then(({ message, success }) => {
        setSubmissionStatus({
          message,
          success,
        });
      });
  };

  const styles = loginFormStyles();
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const { handleChange, handleSubmit } = useForm(requestRegistration);

  return h(
    'form',
    { className: styles.formContainer, onSubmit: handleSubmit },
    h(Typography, { variant: 'h4', className: styles.title }, 'Register '),
    h(TextField, {
      name: 'username',
      placeholder: 'Username',
      onChange: handleChange,
    }),
    h(TextField, {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      onChange: handleChange,
    }),
    h(TextField, {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      onChange: handleChange,
    }),
    submissionStatus &&
      h(Typography, { variant: 'caption' }, submissionStatus.message),
    h(
      'div',
      { className: styles.buttonContainer },
      h(Button, { type: 'submit', className: styles.button }, 'Register'),
    ),
  );
};

export default LoginForm;
