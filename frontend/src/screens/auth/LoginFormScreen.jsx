import React, { useEffect, useState } from 'react';
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
	Divider,
	InputAdornment,
} from '@mui/material';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import FormComponent from '../../components/FormUi/FormComponent';
import ButtonComponent from '../../components/Utils/ButtonComponent';
import Loader from '../../components/Utils/Loader';
import { toast } from 'react-toastify';
import { shades } from '../../theme';
import Meta from '../../components/Utils/Meta';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const initialLoginValues = { email: '', password: '' };

const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email('Invalid email.')
		.required('Please enter your email'),
	password: yup.string().required('Please enter your password'),
});

const LoginFormScreen = () => {
	const { palette } = useTheme();

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Show Password
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const [login, { isLoading }] = useLoginMutation();

	// Get userInfo
	const { userInfo } = useSelector((state) => state.auth);

	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const redirect = searchParams.get('redirect') || '/';

	// check login, if so go to home page or something in that redirect
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (values, onSubmitProps) => {
		try {
			const { email, password } = values;
			const response = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...response }));

			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.error);

			onSubmitProps.resetForm();
		}
	};

	return (
		<FormComponent title='Welcome Back to Athleisure Styles !!'>
			<Meta title='Login To Athleisure Styles' />
			<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
				<Typography
					fontSize='32px'
					fontWeight='bold'
					fontFamily='Play'
					color={shades.neutral[700]}
					mb='10px'
					textAlign='center'
					sx={{ fontSize: { sm: '32px', xs: '24px' } }}
				>
					Sign In
				</Typography>
				<Divider />

				{isLoading && <Loader />}

				<Formik
					initialValues={initialLoginValues}
					validationSchema={loginSchema}
					onSubmit={submitHandler}
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
							<Box
								display='grid'
								mt='30px'
								gap='20px'
								gridTemplateColumns='repeat(4, minmax(0, 1fr))'
								sx={{
									'& > div': {
										gridColumn: isNonMobileScreen ? undefined : 'span 4',
									},
								}}
							>
								<TextField
									label='Email'
									autoComplete='on'
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
									type={showPassword ? 'text' : 'password'}
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.password}
									name='password'
									error={Boolean(touched.password) && Boolean(errors.password)}
									helperText={touched.password && errors.password}
									sx={{ gridColumn: 'span 4' }}
									InputProps={{
										endAdornment: (
											<InputAdornment
												position='end'
												sx={{ cursor: 'pointer' }}
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge='end'
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</InputAdornment>
										),
									}}
								/>

								<Box gridColumn='span 4' textAlign='center' mt='25px' mb='15px'>
									<ButtonComponent disabled={isLoading}>
										Sign In
									</ButtonComponent>
								</Box>

								<Box gridColumn='span 4'>
									<Link
										to={
											redirect ? `/register?redirect=${redirect}` : '/register'
										}
									>
										<Typography
											variant='h4'
											onClick={() => {
												resetForm();
											}}
											sx={{
												pb: '20px',
												textDecoration: 'underline',
												color: palette.blue.main,
												'&:hover': {
													cursor: 'pointer',
													color: palette.blue.light,
												},
											}}
										>
											Don't have an account? Sign Up Here
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

export default LoginFormScreen;
