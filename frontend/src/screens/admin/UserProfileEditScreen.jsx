import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
	Box,
	Typography,
	useMediaQuery,
	useTheme,
	TextField,
	Avatar,
	Input,
	FormControlLabel,
	Checkbox,
	InputAdornment,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
	useGetUsersQuery,
	useGetUserDetailsQuery,
	useUpdateUserProfileMutation,
	useUploadProfileImageMutation,
	useDeleteUserByAdminMutation,
} from '../../slices/usersApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormComponent from '../../components/FormUi/FormComponent';
import ButtonComponent from '../../components/Utils/ButtonComponent';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
	DeleteSweepOutlined,
	EditOutlined,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import { shades } from '../../theme';
import Meta from '../../components/Utils/Meta';

const UserProfileEditScreen = () => {
	const { palette } = useTheme();
	const navigate = useNavigate();

	const { id: userId } = useParams();

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	// Show Password
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	// Get each user profile details
	const {
		data: userProfile,
		isLoading: loadingProfile,
		refetch,
		error,
	} = useGetUserDetailsQuery(userId);

	// console.log(userProfile);

	const [updateUserProfile, { isLoading: loadingUpdateProfile }] =
		useUpdateUserProfileMutation();

	// For profile Image Upload
	const [uploadProfileImage, { isLoading: loadingProfileImage }] =
		useUploadProfileImageMutation();

	// Get users list
	const { refetch: usersListRefetch } = useGetUsersQuery(userId);

	const [deleteUserByAdmin] = useDeleteUserByAdminMutation();

	const [profilePic, setProfilePic] = useState(
		userProfile && userProfile.picturePath
	);

	const initialRegisterValues = userProfile && {
		firstName: userProfile.firstName ? userProfile.firstName : '',
		lastName: userProfile.lastName ? userProfile.lastName : '',
		email: userProfile.email ? userProfile.email : '',
		isAdmin: userProfile.isAdmin ? userProfile.isAdmin : false,
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
		isAdmin: yup.boolean().notRequired(),
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

	useEffect(() => {
		if (userProfile) {
			setProfilePic(userProfile.picturePath);
		}
	}, [userProfile]);

	const submitHandler = async (values, onSubmitProps) => {
		const { firstName, lastName, email, password, isAdmin } = values;

		// When not change profilePic
		if (
			values.picturePath === '' &&
			values.firstName &&
			values.lastName &&
			values.email &&
			values.password
		) {
			try {
				await updateUserProfile({
					userId,
					firstName,
					lastName,
					email,
					password,
					isAdmin,
					picturePath: userProfile.picturePath,
				}).unwrap();

				refetch();

				toast.success('Profile updated successfully');

				navigate('/admin/userslist');
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

				await updateUserProfile({
					userId,
					firstName,
					lastName,
					email,
					password,
					isAdmin,
					picturePath: imageData.picturePath,
				}).unwrap();

				refetch();

				toast.success('Profile updated successfully');

				navigate('/admin/userslist');
			} catch (error) {
				toast.error(error?.data?.message || error.error);
			}
		}
	};

	const deleteHandler = async (id) => {
		if (window.confirm('Would you like to delete your account ?')) {
			try {
				await deleteUserByAdmin(id);
				toast.success('Your account deleted successfully');

				usersListRefetch();
				navigate('/admin/userslist');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<FormComponent title='Edit User Profile'>
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
								<Meta
									title={`${values.firstName} ${values.lastName}'s Profile`}
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

								<FormControlLabel
									label='Admin User'
									control={
										<Checkbox
											checked={values.isAdmin}
											id='isAdmin'
											name='isAdmin'
											onChange={(e) =>
												setFieldValue('isAdmin', e.currentTarget.checked)
											}
										/>
									}
								/>

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
					<Link to='/admin/userslist'>
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
							Back To Users List ?
						</Typography>
					</Link>
				</Box>
			</Box>
		</FormComponent>
	);
};

export default UserProfileEditScreen;
