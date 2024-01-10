import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Typography,
	useMediaQuery,
	useTheme,
	TextField,
	Avatar,
	Input,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
	useUploadProfileImageMutation,
	useUpdateProfileMutation,
	useGetProfileDetailsQuery,
} from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import FormComponent from '../components/FormUi/FormComponent';
import ButtonComponent from '../components/Utils/ButtonComponent';
import Loader from '../components/Utils/Loader';
import Message from '../components/Utils/Message';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { shades } from '../theme';

const ProfileScreen = () => {
	const { palette } = useTheme();
	const dispatch = useDispatch();
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

	const updateSchema = yup.object().shape({
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
		picturePath: yup.string().notRequired(),
	});

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

	useEffect(() => {
		if (userProfile) {
			setProfilePic(userProfile.picturePath);
		}
	}, [userProfile]);

	const submitHandler = async (values, onSubmitProps) => {
		// console.log(values);
		const { firstName, lastName, email, password } = values;

		// When not change profilePic
		if (
			values.picturePath === '' &&
			values.firstName &&
			values.lastName &&
			values.email &&
			values.password
		) {
			try {
				const response = await updateProfile({
					_id: userInfo._id,
					firstName,
					lastName,
					email,
					password,
					picturePath: userInfo.picturePath,
				}).unwrap();

				dispatch(setCredentials(response));
				toast.success('Profile updated successfully');

				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error.error);
			}
		} else {
			// When changed profilePic
			const formData = new FormData();
			for (let value in values) {
				formData.append(value, values[value]);
			}
			// picture path
			formData.append('picturePath', values.picturePath.name);
			try {
				const imageData = await uploadProfileImage(formData).unwrap();

				const response = await updateProfile({
					_id: userInfo._id,
					firstName,
					lastName,
					email,
					password,
					picturePath: imageData.picturePath,
				}).unwrap();

				dispatch(setCredentials(response));
				toast.success('Profile updated successfully');

				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error.error);
			}
		}
	};

	return (
		<FormComponent>
			<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
				<Typography
					variant='h3'
					fontWeight='bold'
					fontFamily='Play'
					mb='15px'
					textAlign='center'
					color={shades.neutral[700]}
				>
					User Profile
				</Typography>

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
						validationSchema={updateSchema}
						enableReinitialize={true}
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
						}) => (
							<form onSubmit={handleSubmit} encType='multipart/form-data'>
								{loadingUpdateProfile && <Loader />}
								{/* Profile Picture */}
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									m='20px 0 15px 0'
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
																<EditOutlinedIcon color='blue' />
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
										type='password'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.password}
										name='password'
										error={
											Boolean(touched.password) && Boolean(errors.password)
										}
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
								</Box>

								<Box gridColumn='span 4' textAlign='center' mt='25px' mb='15px'>
									<ButtonComponent>UPDATE</ButtonComponent>
								</Box>
							</form>
						)}
					</Formik>
				)}
			</Box>
		</FormComponent>
	);
};

export default ProfileScreen;
