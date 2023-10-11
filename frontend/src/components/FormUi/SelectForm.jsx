import React from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const SelectForm = ({ name, ...otherProps }) => {
	// update form state
	const { setFieldValue } = useFormikContext();
	const [field, mata] = useField(name);

	// have to set manually only select form
	const handleChange = (e) => {
		const { value } = e.target;
		// update value ex: review: 1
		setFieldValue(name, value);
	};

	const configSelect = {
		...field,
		...otherProps,
		select: true,
		fullWidth: true,
		variant: 'outlined',
		onChange: handleChange,
	};

	// error handling
	if (mata && mata.touched && mata.error) {
		configSelect.error = true;
		configSelect.helperText = mata.error;
	}

	return <TextField {...configSelect} />;
};

export default SelectForm;
