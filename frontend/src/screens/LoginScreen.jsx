import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Stack } from '@mui/material';
import FormTextField from '../components/FormUi/FormTextField';
import SubmitButton from '../components/FormUi/SubmitButton';

const LoginScreen = () => {

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submit');
	};

	const INITIAL_LOGIN_STATE = { email: '', password: '' };

	const LOGIN_VALIDATION = yup.object().shape({
		email: yup
			.string()
			.email('Invalid email.')
			.required('Please enter your email'),
		password: yup.string().required('Please enter your password'),
	});

	return (
		<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
			<Typography
				fontSize='32px'
				fontWeight='bold'
				fontFamily='Play'
				textAlign='center'
			>
				Login
			</Typography>

			<Formik
				initialValues={{ ...INITIAL_LOGIN_STATE }}
				validationSchema={LOGIN_VALIDATION}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
					resetForm,
				}) => (
					<form onSubmit={handleSubmit}>
						<Grid
							container
							// spacing={3}
							m='0 auto'
							sx={{ width: { sm: '70%', xs: '90%' } }}
						>
							<Grid item xs={12} mt='10px' mb='20px'>
								<Typography variant='h3' mb='7px'>
									Email:
								</Typography>
								<FormTextField
									name='email'
									label='Enter Your Email'
									type='email'
									onBlur={handleBlur}
									value={values.email}
									onChange={handleChange}
									error={Boolean(touched.email) && Boolean(errors.email)}
									helperText={touched.email && errors.email}
								/>
							</Grid>

							<Grid item xs={12}>
								<Typography variant='h3' mb='7px'>
									Password:
								</Typography>
								<FormTextField
									name='password'
									label='Enter Your Password'
									type='password'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.password}
									error={Boolean(touched.password) && Boolean(errors.password)}
									helperText={touched.password && errors.password}
								/>
							</Grid>

							<Grid item xs={12} textAlign='center' mt='35px'>
								<SubmitButton children='Sign In' width='100%' />
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default LoginScreen;
