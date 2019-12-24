import { useState } from "react";

const useRegisterForm = cb => {
  const [values, setValues] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const validateField = ({ name, value }) => {
    const validRegex = /^[a-z0-9]+$/i;
    let error = null;

    const trimmed = value.trim();

    if (name === "password") {
      if (trimmed.length < 4 || trimmed.length > 20) {
        error = "Password must be between 4 and 20 characters";
      }
      if (!validRegex.test(trimmed)) {
        error = "Passwords may only contain alphanumeric characters.";
      }
    }
    if (name === "username") {
      if (trimmed.length < 4 || trimmed.length > 20) {
        error = "Username must be between 4 and 20 characters.";
      }
      if (!validRegex.test(trimmed)) {
        error = "Username may only contain alphanumeric characters.";
      }
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValidationErrors([]);

    let errors = [];

    if (Object.keys(values).length !== 3) {
      setValidationErrors([...validationErrors, "All fields are mandatory."]);
      return;
    }

    for (let name in values) {
      const error = validateField({
        name,
        value: values[name]
      });
      if (error !== null) {
        errors.push(error);
      }
    }

    if (errors.length) {
      setValidationErrors([...validationErrors, ...errors]);
      return;
    }

    cb(values);
  };

  return {
    handleChange,
    handleSubmit,
    validationErrors
  };
};

export default useRegisterForm;
