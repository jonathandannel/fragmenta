import { useState } from 'react';

const useLoginForm = (cb) => {
	const [ values, setValues ] = useState({});

	const handleChange = ({ target: { name, value } }) => {
		setValues({
			...values,
			[name]: value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		cb(values);
	};

	return {
		handleChange,
		handleSubmit,
	};
};

export default useLoginForm;
