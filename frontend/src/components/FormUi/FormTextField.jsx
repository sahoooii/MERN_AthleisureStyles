import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

// name= name of the field
// ex: field= name:comment value='' mata=error handling
const FormTextField = ({ name, ...otherProps }) => {
	const [field, mata] = useField(name);

	const configTextField = {
		...field,
		...otherProps,
		fullWidth: true,
		variant: 'outlined',
	};

	// error handling
	if (mata && mata.touched && mata.error) {
		configTextField.error = true;
		configTextField.helperText = mata.error;
	}

	return <TextField {...configTextField} />;
};

export default FormTextField;
