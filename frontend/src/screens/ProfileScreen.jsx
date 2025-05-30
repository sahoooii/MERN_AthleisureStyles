import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Typography,
	useMediaQuery,
	useTheme,
	TextField,
	Avatar,
	Input,
	InputAdornment,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
	useUploadProfileImageMutation,
	useUpdateProfileMutation,
	useGetProfileDetailsQuery,
	useDeleteUserMutation,
} from '../slices/usersApiSlice';
import { logout, loginSuccess } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import FormComponent from '../components/FormUi/FormComponent';
import ButtonComponent from '../components/Utils/ButtonComponent';
import Loader from '../components/Utils/Loader';
import Message from '../components/Utils/Message';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
	DeleteSweepOutlined,
	EditOutlined,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import { shades } from '../theme';
import Meta from '../components/Utils/Meta';
import { useImageSubmitHandler } from '../hooks/useImageSubmitHandler';
import { userProfileSchema } from '../features/users/forms/userProfileSchema';

const ProfileScreen = () => {
	const { palette } = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Show Password
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const { userInfo } = useSelector((state) => state.auth);

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const [profilePic, setProfilePic] = useState(userInfo.picturePath);

	const initialRegisterValues = {
		firstName: userInfo.firstName ? userInfo.firstName : '',
		lastName: userInfo.lastName ? userInfo.lastName : '',
		email: userInfo.email ? userInfo.email : '',
		password: '',
		confirmPassword: '',
		// initialValuesは空にしておく
		picturePath: '',
	};

	// Get user profile details
	const {
		data: userProfile,
		isLoading: loadingProfile,
		refetch,
		error,
	} = useGetProfileDetailsQuery();

	const [updateProfile, { isLoading: loadingUpdateProfile }] =
		useUpdateProfileMutation();

	// For profile Image Upload
	const [uploadProfileImage, { isLoading: loadingProfileImage }] =
		useUploadProfileImageMutation();

	const [deleteUser] = useDeleteUserMutation();

	useEffect(() => {
		if (userProfile) {
			setProfilePic(userProfile.picturePath);
		}
	}, [userProfile]);

	// File upload & profile info update
	const { submitHandler } = useImageSubmitHandler({
		mutationFn: updateProfile,
		uploadMutationFn: uploadProfileImage,
		extractFormData: (values) => ({
			file: values.picturePath,
			fieldName: 'picturePath',
		}),
		buildPayload: (values, imageData) => ({
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password,
			picturePath: imageData?.image,
		}),
		onSuccess: (response) => {
			dispatch(loginSuccess({ ...response }));
			toast.success('Profile updated successfully');
			refetch();
			navigate('/profile');
		},
		onError: (error) => {
			const message =
				error?.data?.message || error.error || 'Something went wrong';
			toast.error(message);
		},
	});

	const updateSubmitHandler = async (values, onSubmitProps) => {
		const { firstName, lastName, email, password } = values;

		// When not change profilePic
		if (
			(typeof values.picturePath === 'string' || values.picturePath === '') &&
			values.firstName &&
			values.lastName &&
			values.email &&
			values.password
		) {
			try {
				console.log('fail!');
				const response = await updateProfile({
					firstName,
					lastName,
					email,
					password,
					picturePath: userInfo.picturePath,
				}).unwrap();

				dispatch(loginSuccess({ ...response }));
				toast.success('Profile updated successfully');

				refetch();
				navigate('/profile');
			} catch (error) {
				toast.error(error?.data?.message || error.error);
			}
		} else {
			await submitHandler(values, onSubmitProps);
		}
	};

	const deleteHandler = async (id) => {
		if (window.confirm('Would you like to delete your account ?')) {
			try {
				await deleteUser(id);
				// Clear localStorage userInfo
				dispatch(logout());

				toast.success('Your account deleted successfully');

				navigate('/register');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<FormComponent title='Edit Your Profile'>
			<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
				{loadingProfile ? (
					<Loader />
				) : error ? (
					<Box margin='0 auto' width='80%'>
						<Message severity='error'>
							{error?.data?.message || error.error}
						</Message>
					</Box>
				) : (
					<Formik
						initialValues={initialRegisterValues}
						validationSchema={userProfileSchema(true)}
						enableReinitialize={true}
						onSubmit={updateSubmitHandler}
					>
						{({
							values,
							errors,
							touched,
							handleBlur,
							handleChange,
							handleSubmit,
							setFieldValue,
						}) => (
							<form onSubmit={handleSubmit} encType='multipart/form-data'>
								{loadingUpdateProfile && <Loader />}
								<Meta
									title={`${values.firstName} ${values.lastName} Profile`}
								/>
								{/* Profile Picture */}
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									mb='20px'
								>
									{loadingProfileImage && <Loader />}
									<Avatar
										htmlFor='picturePath'
										src={profilePic}
										alt={`${values.firstName} ${values.lastName}`}
										sx={{
											width: 120,
											height: 120,
										}}
									/>
								</Box>

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
									<Box
										gridColumn='span 4'
										border={`1px solid ${palette.neutral.main}`}
										borderRadius='5px'
										p='1rem'
									>
										<Box
											border={`2px dashed ${palette.green.main}`}
											p='1rem'
											sx={{
												'&:hover': { cursor: 'pointer' },
											}}
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
																Change Picture Here
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
															// cursor='pointer'
														>
															<Typography variant='body2'>
																{values.picturePath.name}
															</Typography>
															<Box
																sx={{
																	cursor: 'pointer',
																	mr: '20px',
																}}
															>
																<EditOutlined color='blue' />
															</Box>
															<Input
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
										autoComplete='off'
										type={showPassword ? 'text' : 'password'}
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.password}
										name='password'
										error={
											Boolean(touched.password) && Boolean(errors.password)
										}
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
									<TextField
										label='Confirm Password'
										autoComplete='off'
										type={showConfirmPassword ? 'text' : 'password'}
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
										InputProps={{
											endAdornment: (
												<InputAdornment
													position='end'
													sx={{ cursor: 'pointer' }}
													onClick={handleClickShowConfirmPassword}
													onMouseDown={handleMouseDownPassword}
													edge='end'
												>
													{showConfirmPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</InputAdornment>
											),
										}}
									/>
								</Box>

								<Box
									mt='20px'
									gap='20px'
									display='flex'
									justifyContent='space-between'
									alignItems='center'
								>
									<ButtonComponent type='submit'>UPDATE</ButtonComponent>
									{!userProfile.isAdmin && (
										<ButtonComponent
											backgroundColor={shades.neutral[500]}
											type='button'
											onClick={() => deleteHandler(userProfile._id)}
										>
											<DeleteSweepOutlined sx={{ mr: '5px' }} />
											DELETE
										</ButtonComponent>
									)}
								</Box>
							</form>
						)}
					</Formik>
				)}

				<Box gridColumn='span 4' mt='25px'>
					<Link to='/'>
						<Typography
							variant='h4'
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
							Back To Home ?
						</Typography>
					</Link>
				</Box>
			</Box>
		</FormComponent>
	);
};

export default ProfileScreen;
