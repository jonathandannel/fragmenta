import { createElement as h, useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import { loginFormStyles } from './styles';
import { useForm } from '../hooks';

const register = fieldValues => {
  // Post
  fetch('');
  console.log(fieldValues);
};

const LoginForm = () => {
  const styles = loginFormStyles();

  const { handleChange, handleSubmit } = useForm(submitForm);

  return h(
    'form',
    { className: styles.formContainer, onSubmit: handleSubmit },
    h(Typography, { variant: 'h4', className: styles.title }, 'Register '),
    h(TextField, {
      name: 'firstName',
      placeholder: 'First name',
      onChange: handleChange,
    }),
    h(TextField, {
      name: 'lastName',
      placeholder: 'Last name',
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
    h(
      'div',
      { className: styles.buttonContainer },
      h(Button, { type: 'submit', className: styles.button }, 'Register'),
    ),
  );
};

export default LoginForm;
