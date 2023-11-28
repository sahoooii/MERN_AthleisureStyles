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

	return (
		<Box
			display='grid'
			gap='15px'
			gridTemplateColumns='repeat(4, minmax(0, 1fr))' //0 to 25%
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
			<TextField
				fullWidth
				type='text'
				label='Address'
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.address}
				name={formattedName('address')}
				error={formattedError('address')}
				helperText={formattedHelper('address')}
				sx={{ gridColumn: 'span 4' }}
			/>
			<TextField
				fullWidth
				type='text'
				label='City'
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.city}
				name={formattedName('city')}
				error={formattedError('city')}
				helperText={formattedHelper('city')}
				sx={{ gridColumn: 'span 2' }}
			/>
			<TextField
				fullWidth
				type='text'
				label='State'
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.state}
				name={formattedName('state')}
				error={formattedError('state')}
				helperText={formattedHelper('state')}
				sx={{ gridColumn: 'span 2' }}
			/>
			<TextField
				fullWidth
				type='text'
				label='Postal Code'
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.postalCode}
				name={formattedName('postalCode')}
				error={formattedError('postalCode')}
				helperText={formattedHelper('postalCode')}
				sx={{ gridColumn: 'span 2' }}
			/>
			<TextField
				fullWidth
				type='text'
				label='Country'
				onBlur={handleBlur}
				onChange={handleChange}
				value={values.country}
				name={formattedName('country')}
				error={formattedError('country')}
				helperText={formattedHelper('country')}
				sx={{ gridColumn: 'span 2' }}
			/>
		</Box>
	);
};

export default AddressForm;
