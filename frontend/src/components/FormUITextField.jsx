import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const FormUITextField = ({ name, ...otherProps }) => {
	// name= name of the field
	const [field, mata] = useField(name);

	const configTextField = {
		field,
		...otherProps,
		fullWidth: true,
		variant: 'outlined',
	};

	return <TextField {...configTextField} />;
};

export default FormUITextField;
