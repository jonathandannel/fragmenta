import { useState } from 'react';

const useForm = cb => {
  const [values, setValues] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    cb(values);
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
