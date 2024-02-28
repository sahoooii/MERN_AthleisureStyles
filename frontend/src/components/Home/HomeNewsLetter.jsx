import React from 'react';
import {
	Box,
	Typography,
	IconButton,
	useMediaQuery,
	TextField,
	InputAdornment,
} from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { shades } from '../../theme';

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
				height='40vh'
				display='flex'
				alignItems='center'
				justifyContent='center'
				flexDirection='column'
				backgroundColor={shades.babyPink[100]}
			>
				<Typography variant='h1' fontSize='70px' mb='20px'>
					News Letter
				</Typography>
				<Typography variant='h3' fontSize='24px' fontWeight='300' mb='20px'>
					Join US to Athleisure Family
				</Typography>

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
									sx={{ width: '300px' }}
									InputProps={{
										style: {
											borderRadius: '10px',
										},
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton type='submit' sx={{ color: 'teal' }}>
													<SendOutlinedIcon />
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
