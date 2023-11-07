import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Grid,
	Typography,
	useMediaQuery,
	useTheme,
	TextField,
} from '@mui/material';
import Dropzone from 'react-dropzone';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SubmitButton from '../../components/FormUi/SubmitButton';

const submitHandler = (e) => {
	e.preventDefault();
	console.log('submit');
};

const initialLoginState = { email: '', password: '' };

const initialRegisterState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmationPassword: '',
	picturePath: '',
};

const loginValidation = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email.')
		.required('Please enter your email'),
	password: yup.string().required('Please enter your password'),
});

const registerValidation = yup.object().shape({
	firstName: yup.string().required('Please enter your first name'),
	lastName: yup.string().required('Please enter your last name'),
	email: yup
		.string()
		.email('Invalid email.')
		.required('Please enter your email'),
	password: yup.string().required('Please enter your password'),
	confirmationPassword: yup
		.string()
		.required('Please enter your confirmation password'),
	picturePath: yup.string().required('Please upload your profile picture'),
});

const LoginRegisterForm = () => {
	const [pageType, setPageType] = useState('login');
	const { palette } = useTheme();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const isLogin = pageType === 'login';
	const isRegister = pageType === 'register';

	const register = async (values, onSubmitProps) => {
		// This allows to send form info with image
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		formData.append('picturePath', values.picturePath.name);
	};

	const login = async (values, onSubmitProps) => {};

	const handleFormSubmit = async (values, onSubmitProps) => {
		if (isLogin) await login(values, onSubmitProps);
		if (isRegister) await register(values, onSubmitProps);
	};

	return (
		<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
			{isLogin ? (
				<Typography
					fontSize='32px'
					fontWeight='bold'
					fontFamily='Play'
					textAlign='center'
					mb='10px'
				>
					LOGIN
				</Typography>
			) : (
				<Typography
					fontSize='32px'
					fontWeight='bold'
					fontFamily='Play'
					textAlign='center'
					mb='10px'
				>
					REGISTER
				</Typography>
			)}

			<Formik
				initialValues={isLogin ? initialLoginState : initialRegisterState}
				validationSchema={isLogin ? loginValidation : registerValidation}
				onSubmit={handleFormSubmit}
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
							{/* Register Section */}
							{isRegister && (
								<>
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
										error={
											Boolean(touched.lastName) && Boolean(errors.lastName)
										}
										helperText={touched.lastName && errors.lastName}
										sx={{ gridColumn: 'span 2' }}
									/>
									{/* Profile Image */}
									<Box
										gridColumn='span 4'
										border={`1px solid ${palette.neutral.main}`}
										borderRadius='5px'
										p='1rem'
									>
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
								</>
							)}
							{/* Login Register */}
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
							{!isLogin ? (
								<>
									<TextField
										label='Confirmation Password'
										type='password'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.confirmationPassword}
										name='confirmationPassword'
										error={
											Boolean(touched.confirmationPassword) &&
											Boolean(errors.confirmationPassword)
										}
										helperText={
											touched.confirmationPassword &&
											errors.confirmationPassword
										}
										sx={{ gridColumn: 'span 4' }}
									/>
									<Box
										gridColumn='span 4'
										textAlign='center'
										mt='25px'
										mb='15px'
									>
										<SubmitButton children='REGISTER' width='100%' />
									</Box>
								</>
							) : (
								<Box gridColumn='span 4' textAlign='center' mt='25px' mb='15px'>
									<SubmitButton children='LOGIN' width='100%' />
								</Box>
							)}

							<Box gridColumn='span 4'>
								<Typography
									variant='h4'
									onClick={() => {
										setPageType(isLogin ? 'register' : 'login');
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
									{isLogin
										? "Don't have an account? Sign Up Here"
										: 'Already have an account? Login Here'}
								</Typography>
							</Box>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default LoginRegisterForm;
