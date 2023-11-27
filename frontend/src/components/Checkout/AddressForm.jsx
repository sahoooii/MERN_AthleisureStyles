import React from 'react';
import { TextField, useMediaQuery, Box } from '@mui/material';
import { getIn } from 'formik';

const AddressForm = ({
	type,
	values,
	errors,
	touched,
	handleBlur,
	handleChange,
}) => {
	const isNonMobile = useMediaQuery('(min-width: 600px)');

	// For better code readability
	// type= billing or shipping field= field name
	const formattedName = (field) => `${type}.${field}`;

	const formattedError = (field) =>
		Boolean(
			getIn(touched, formattedName(field)) &&
				getIn(errors, formattedName(field))
		);

	// Showing Text error
	const formattedHelper = (field) =>
		getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

	// schema[(intermediate value)(intermediate value)(intermediate value)] is not a function
	return (
		<Box
			display='grid'
			gap='15px'
			gridTemplateColumns='repeat(4, minmax(0, 1fr))'
			sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
		>
			<TextField
				fullWidth
				type='text'
				label='First Name'
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.firstName}
				name={formattedName('firstName')}
				error={formattedError('firstName')}
				helperText={formattedHelper('firstName')}
				sx={{ gridColumn: 'span 2' }}
			/>
			<TextField
				fullWidth
				type='text'
				label='Last Name'
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.lastName}
				name={formattedName('lastName')}
				error={formattedError('lastName')}
				helperText={formattedHelper('lastName')}
				sx={{ gridColumn: 'span 2' }}
			/>
		</Box>
	);
};

export default AddressForm;
