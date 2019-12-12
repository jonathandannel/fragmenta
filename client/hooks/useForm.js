import { useState } from 'react';

const useForm = cb => {
  const [values, setValues] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value.trim(),
    });
  };

  const validateField = ({ name, value }) => {
    const validRegex = /^[a-z0-9]+$/i;
    const trimmed = value.trim();
    let error = null;

    if (name === 'password') {
      if (trimmed.length < 4 || trimmed.length > 20) {
        error = 'Password must be between 4 and 20 characters';
      }
      if (!validRegex.test(trimmed)) {
        error = 'Passwords may only contain alphanumeric characters';
      }
    }
    if (name === 'username') {
      if (trimmed.length < 4 || trimmed.length > 20) {
        error = 'Username must be between 4 and 20 characters';
      }
      if (!validRegex.test(trimmed)) {
        error = 'Username may only contain alphanumeric characters';
      }
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValidationErrors([]);

    const errors = [];

    for (let name in values) {
      const error = validateField({
        name,
        value: values[name],
      });
      if (error !== null) errors.push(error);
    }

    if (!errors.length) {
      cb(values);
    } else {
      setValidationErrors(errors);
    }
  };

  return {
    handleChange,
    handleSubmit,
    validationErrors,
  };
};

export default useForm;
