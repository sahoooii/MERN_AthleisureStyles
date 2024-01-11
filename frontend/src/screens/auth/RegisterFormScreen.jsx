import React, { useEffect } from 'react';
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
import {
	useRegisterMutation,
	useUploadProfileImageMutation,
} from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import FormComponent from '../../components/FormUi/FormComponent';
import ButtonComponent from '../../components/Utils/ButtonComponent';
import Loader from '../../components/Utils/Loader';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { shades } from '../../theme';

const initialRegisterValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	picturePath: '',
};

// For profile image validation
const MAX_FILE_SIZE = 3145728; //3MB
const validFileExtensions = {
	image: ['jpg', 'png', 'jpeg', 'webp'],
};

function isValidFileType(fileName, fileType) {
	return (
		fileName &&
		validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
	);
}

const registerSchema = yup.object().shape({
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
	picturePath: yup
		.mixed()
		.required('Please upload your profile picture')
		.test('is-valid-type', 'Not a valid image type', (value) =>
			isValidFileType(value && value.name.toLowerCase(), 'image')
		)
		.test(
			'is-valid-size',
			'Max allowed size is 3MB',
			(value) => value && value.size <= MAX_FILE_SIZE
		),
});

const RegisterFormScreen = () => {
	const { palette } = useTheme();

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();
	const [uploadProfileImage] = useUploadProfileImageMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const redirect = searchParams.get('redirect') || '/';

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	// Profile image upload and register
	const submitHandler = async (values, onSubmitProps) => {
		const { firstName, lastName, email, password } = values;
		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		// picture path
		formData.append('picturePath', values.picturePath.name);
		try {
			const imageData = await uploadProfileImage(formData).unwrap();

			const response = await register({
				firstName,
				lastName,
				email,
				password,
				picturePath: imageData.picturePath,
			}).unwrap();

			// Consider later
			// const imageData = await uploadProfileImage(formData).unwrap();

			// const data = {
			// 	...response,
			// 	picturePath: imageData.picturePath,
			// };
			// await register(data);
			dispatch(setCredentials({ ...response }));

			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.error);

			// onSubmitProps.resetForm();
		}
	};

	return (
		<FormComponent title='Welcome to Athleisure Styles, For All SHOPAHOLICS!'>
			<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
				<Typography
					fontSize='32px'
					fontWeight='bold'
					fontFamily='Play'
					mb='15px'
					color={shades.neutral[700]}
				>
					REGISTER
				</Typography>

				{isLoading && <Loader />}

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
						setFieldValue,
						resetForm,
					}) => (
						<form onSubmit={handleSubmit} encType='multipart/form-data'>
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
									autoComplete='off'
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
									helperText={touched.confirmPassword && errors.confirmPassword}
									sx={{ gridColumn: 'span 4' }}
								/>

								{/* Profile Image */}
								<Box
									gridColumn='span 4'
									border={`1px solid ${palette.neutral.main}`}
									borderRadius='5px'
									p='1rem'
								>
									{/* Multer profile upload */}
									<Box
										border={`2px dashed ${palette.green.main}`}
										p='1rem'
										sx={{ '&:hover': { cursor: 'pointer' } }}
									>
										{!values.picturePath ? (
											<>
												<label htmlFor='picturePath'>
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
															cursor: 'pointer',
														}}
													>
														<AddPhotoAlternateIcon color='action' />
														<Typography variant='body2' ml='3px'>
															Add Picture Here
														</Typography>
													</Box>
													<TextField
														type='file'
														name='picturePath'
														id='picturePath'
														accept='.png,.jpeg,.jpg'
														style={{ display: 'none' }}
														onBlur={handleBlur}
														onChange={(e) =>
															setFieldValue(
																'picturePath',
																e.currentTarget.files[0]
															)
														}
													/>
												</label>
											</>
										) : (
											<>
												<label
													htmlFor='picturePath'
													style={{ cursor: 'pointer' }}
												>
													<Box
														display='flex'
														justifyContent='space-between'
														alignItems='center'
													>
														<Typography variant='body2'>
															{values.picturePath.name}
														</Typography>
														<Box
															sx={{
																cursor: 'pointer',
															}}
														>
															<EditOutlinedIcon color='blue' />
														</Box>
														<input
															type='file'
															name='picturePath'
															id='picturePath'
															accept='.png,.jpeg,.jpg'
															style={{ display: 'none' }}
															onChange={(e) =>
																setFieldValue(
																	'picturePath',
																	e.currentTarget.files[0]
																)
															}
														/>
													</Box>
												</label>
											</>
										)}
									</Box>
									{errors.picturePath && Boolean(touched.picturePath) && (
										<p
											style={{
												color: '#d32f2f',
												fontSize: '10px',
												marginBottom: '0',
											}}
										>
											{errors.picturePath}
										</p>
									)}
								</Box>

								<Box gridColumn='span 4' textAlign='center' mt='25px' mb='15px'>
									<ButtonComponent>REGISTER</ButtonComponent>
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
