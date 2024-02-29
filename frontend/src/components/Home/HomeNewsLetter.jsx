import React from 'react';
import {
	Box,
	Typography,
	IconButton,
	useMediaQuery,
	TextField,
	InputAdornment,
} from '@mui/material';
import { SendOutlined, ContactMailOutlined } from '@mui/icons-material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const HomeNewsLetter = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const initialRegisterValues = { email: '' };

	const registerSchema = yup.object().shape({
		email: yup
			.string()
			.email('Invalid email.')
			.required('Please enter your email'),
	});

	const submitHandler = async (values, onSubmitProps) => {
		try {
			const { email } = values;
			window.open(`mailto:${email}`);

			onSubmitProps.resetForm();
		} catch (err) {
			toast.error(err?.data?.message || err.error);

			onSubmitProps.resetForm();
		}
	};

	return (
		isNonMobile && (
			<Box
				display='flex'
				// alignItems='center'
				// justifyContent='center'
				flexDirection='column'
				m='20px 0'
			>
				<Typography variant='h3' fontWeight={300} mb='20px'>
					News Letter
				</Typography>
				<Box mb='30px' display='flex' alignItems='center'>
					<ContactMailOutlined />
					<Typography
						variant='h4'
						sx={{ ml: '10px', fontSize: { md: '16px' } }}
					>
						Join US to Athleisure Family
					</Typography>
				</Box>

				<Formik
					initialValues={initialRegisterValues}
					validationSchema={registerSchema}
					onSubmit={submitHandler}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
					}) => (
						<form onSubmit={handleSubmit}>
							<Box
								height='40px'
								display='flex'
								alignItems='center'
								justifyContent='space-between'
							>
								<TextField
									id='email'
									label='Email'
									// autoComplete='on'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.email}
									name='email'
									error={Boolean(touched.email) && Boolean(errors.email)}
									helperText={touched.email && errors.email}
									sx={{
										width: {
											sm: '200px',
											md: '250px',
											lg: '280px',
											input: { color: 'white' },
											color: 'white',
										},
									}}
									color='blue'
									InputProps={{
										style: {
											borderRadius: '10px',
											color: 'white',
										},
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton type='submit' sx={{ color: 'teal' }}>
													<SendOutlined />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		)
	);
};

export default HomeNewsLetter;
