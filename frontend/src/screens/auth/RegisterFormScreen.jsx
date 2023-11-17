import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Typography,
	useMediaQuery,
	useTheme,
	TextField,
} from '@mui/material';
import Dropzone from 'react-dropzone';
import FormComponent from '../../components/auth/FormComponent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SubmitButton from '../../components/FormUi/SubmitButton';

const initialRegisterState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	picturePath: '',
};

const registerValidation = yup.object().shape({
	firstName: yup.string().required('Please enter your first name'),
	lastName: yup.string().required('Please enter your last name'),
	// notOneOf('emailList', 'Email already taken)
	email: yup
		.string()
		.email('Invalid email.')
		.required('Please enter your email'),
	password: yup
		.string()
		.min(6, 'Password must contain at least 6 characters')
		.required('Please enter your password'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Password does not match')
		.required('Please enter your confirm password'),
	picturePath: yup.string().required('Please upload your profile picture'),
});

const RegisterFormScreen = () => {
	const { palette } = useTheme();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const redirect = searchParams.get('redirect') || '/';

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	// for form submit
	const submitHandler = async (e) => {
		e.preventDefault();
		console.log('submit');
	};

	// Use multer, will delete
	const register = async (values, onSubmitProps) => {
		// This allows to send form info with image
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		formData.append('picturePath', values.picturePath.name);
	};

	const handleFormSubmit = async (values, onSubmitProps) => {
		await register(values, onSubmitProps);
	};

	return (
		<FormComponent>
			<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
				<Typography
					fontSize='32px'
					fontWeight='bold'
					fontFamily='Play'
					textAlign='center'
					mb='10px'
				>
					REGISTER
				</Typography>

				<Formik
					initialValues={initialRegisterState}
					validationSchema={registerValidation}
					// onSubmit={handleFormSubmit}
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
						setFieldValue,
						resetForm,
					}) => (
						<form onSubmit={handleSubmit}>
							<Box
								display='grid'
								gap='20px'
								gridTemplateColumns='repeat(4, minmax(0, 1fr))'
								sx={{
									'& > div': {
										gridColumn: isNonMobileScreen ? undefined : 'span 4',
									},
								}}
							>
								<TextField
									label='First Name'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name='firstName'
									error={
										Boolean(touched.firstName) && Boolean(errors.firstName)
									}
									helperText={touched.firstName && errors.firstName}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									label='Last Name'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									name='lastName'
									error={Boolean(touched.lastName) && Boolean(errors.lastName)}
									helperText={touched.lastName && errors.lastName}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									label='Email'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.email}
									name='email'
									error={Boolean(touched.email) && Boolean(errors.email)}
									helperText={touched.email && errors.email}
									sx={{ gridColumn: 'span 4' }}
								/>
								<TextField
									label='Password'
									type='password'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.password}
									name='password'
									error={Boolean(touched.password) && Boolean(errors.password)}
									helperText={touched.password && errors.password}
									sx={{ gridColumn: 'span 4' }}
								/>
								<TextField
									label='Confirm Password'
									type='password'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.confirmPassword}
									name='confirmPassword'
									error={
										Boolean(touched.confirmPassword) &&
										Boolean(errors.confirmPassword)
									}
									helperText={
										touched.confirmPassword && errors.confirmPassword
									}
									sx={{ gridColumn: 'span 4' }}
								/>

								{/* Profile Image */}
								<Box
									gridColumn='span 4'
									border={`1px solid ${palette.neutral.main}`}
									borderRadius='5px'
									p='1rem'
								>
									{/* Multer */}
									<Dropzone
										acceptedFiles='.jpg,.jpeg,.png'
										multiple={false}
										onDrop={(acceptedFiles) => {
											setFieldValue('picturePath', acceptedFiles[0]);
										}}
									>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()}
												border={`2px dashed ${palette.green.main}`}
												p='1rem'
												sx={{ '&:hover': { cursor: 'pointer' } }}
											>
												<input {...getInputProps()} />
												{!values.picturePath ? (
													<Typography variant='body2'>
														Add Picture Here
													</Typography>
												) : (
													<Box
														display='flex'
														justifyContent='space-between'
														alignItems='center'
													>
														<Typography variant='body2'>
															{values.picturePath.name}
														</Typography>
														<EditOutlinedIcon color='blue' />
													</Box>
												)}
											</Box>
										)}
									</Dropzone>
								</Box>

								<Box gridColumn='span 4' textAlign='center' mt='25px' mb='15px'>
									<SubmitButton children='REGISTER' width='100%' />
								</Box>

								<Box gridColumn='span 4'>
									<Link
										to={redirect ? `/login?redirect=${redirect}` : '/login'}
									>
										<Typography
											variant='h4'
											onClick={() => {
												resetForm();
											}}
											sx={{
												textDecoration: 'underline',
												color: palette.blue.main,
												'&:hover': {
													cursor: 'pointer',
													color: palette.blue.light,
												},
											}}
										>
											Already have an account? Login Here
										</Typography>
									</Link>
								</Box>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</FormComponent>
	);
};

export default RegisterFormScreen;
