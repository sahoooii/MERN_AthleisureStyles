import React from 'react';
import {
	Box,
	Typography,
	useMediaQuery,
	useTheme,
	TextField,
	Input,
	MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
	useCreateItemMutation,
	useUploadItemImagMutation,
} from '../../slices/itemsApiSlice';
import FormComponentTop from '../../components/FormUi/FormComponentTop';
import ButtonComponent from '../../components/Utils/ButtonComponent';
import Loader from '../../components/Utils/Loader';
import Meta from '../../components/Utils/Meta';
import ItemCategoryMenu from '../../components/items/ItemCategoryMenu';

const ItemEditScreen = () => {
	const initialItemsValues = {
		name: '',
		price: '',
		image: '',
		brand: '',
		category: '',
		code: '',
		countInStock: '',
		description: '',
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

	const itemRegisterSchema = yup.object().shape({
		name: yup.string().required('Please enter item name'),
		price: yup
			.number()
			.required('Please enter item price')
			.min(1, 'Please enter positive number or 1'),
		image: yup
			.mixed()
			.required('Please upload item image')
			.test('is-valid-type', 'Not a valid image type', (value) =>
				isValidFileType(value && value.name.toLowerCase(), 'image')
			)
			.test(
				'is-valid-size',
				'Max allowed size is 3MB',
				(value) => value && value.size <= MAX_FILE_SIZE
			),
		brand: yup.string().required('Please enter item brand name'),
		category: yup.string().required('Please enter item category'),
		code: yup.number().required('Please enter priority code'),
		countInStock: yup
			.number()
			.required('Please enter item stock')
			.integer()
			.min(0, 'Please enter positive number or 0'),
		description: yup
			.string()
			.min(50, 'Description must contain at least 50 characters')
			.required('Please enter item description'),
	});

	const { palette } = useTheme();
	const navigate = useNavigate();

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const [createItem, { isLoading }] = useCreateItemMutation();

	// For item Image Upload
	const [uploadItemImag] = useUploadItemImagMutation();

	const submitHandler = async (values, onSubmitProps) => {
		// console.log('values:', values);
		const { name, price, brand, category, code, countInStock, description } =
			values;

		const formData = new FormData();
		for (let value in values) {
			formData.append(value, values[value]);
		}
		// item image
		formData.append('image', 'itemImage');
		// formData.append('image', values.image.name);

		try {
			const imageData = await uploadItemImag(formData).unwrap();

			await createItem({
				name,
				price,
				brand,
				category,
				code,
				countInStock,
				description,
				image: imageData.image,
			}).unwrap();

			toast.success('Item updated successfully');

			navigate('/admin/itemslist');
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
			<Meta title='Create A New Item' />

			<FormComponentTop title='Create A New ITEM'>
				{isLoading && <Loader />}

				<Formik
					initialValues={initialItemsValues}
					validationSchema={itemRegisterSchema}
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
							<Box
								display='grid'
								mt='10px'
								gap='20px'
								gridTemplateColumns='repeat(4, minmax(0, 1fr))'
								sx={{
									'& > div': {
										gridColumn: isNonMobileScreen ? undefined : 'span 4',
									},
								}}
							>
								<TextField
									label='Item Name'
									autoComplete='off'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.name}
									name='name'
									error={Boolean(touched.name) && Boolean(errors.name)}
									helperText={touched.name && errors.name}
									sx={{ gridColumn: 'span 4' }}
								/>
								<TextField
									label='Item Price'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.price}
									name='price'
									error={Boolean(touched.price) && Boolean(errors.price)}
									helperText={touched.price && errors.price}
									sx={{ gridColumn: 'span 2' }}
									// inputProps={{ style: { textAlign: 'right' } }}
								/>
								<TextField
									label='Item Stock'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.countInStock}
									name='countInStock'
									error={
										Boolean(touched.countInStock) &&
										Boolean(errors.countInStock)
									}
									helperText={touched.countInStock && errors.countInStock}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									select
									label='Item Category'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.category}
									name='category'
									error={Boolean(touched.category) && Boolean(errors.category)}
									helperText={touched.category && errors.category}
									sx={{ gridColumn: 'span 2' }}
								>
									{ItemCategoryMenu.map((menu) => (
										<MenuItem
											key={`${menu.value}-${menu.name}`}
											value={menu.name}
										>
											{menu.name}
										</MenuItem>
									))}
								</TextField>
								<TextField
									label='Priority Order (Start from 1)'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.code}
									name='code'
									error={Boolean(touched.code) && Boolean(errors.code)}
									helperText={touched.code && errors.code}
									sx={{ gridColumn: 'span 2' }}
								/>

								<TextField
									label='Item Brand'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.brand}
									name='brand'
									error={Boolean(touched.brand) && Boolean(errors.brand)}
									helperText={touched.brand && errors.brand}
									sx={{ gridColumn: 'span 4' }}
								/>
								<TextField
									multiline
									rows={4}
									name='description'
									label='Item Description'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.description}
									error={
										Boolean(touched.description) && Boolean(errors.description)
									}
									helperText={touched.description && errors.description}
									sx={{ gridColumn: 'span 4' }}
								/>
								{/* Item Image */}
								<Box
									gridColumn='span 4'
									border={`1px solid ${palette.neutral.main}`}
									borderRadius='5px'
									p='1rem'
									mb='20px'
								>
									<Box
										border={`2px dashed ${palette.green.main}`}
										p='1rem'
										sx={{
											'&:hover': { cursor: 'pointer' },
										}}
									>
										{!values.image ? (
											<>
												<label htmlFor='image'>
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
															cursor: 'pointer',
														}}
													>
														<AddPhotoAlternateIcon color='action' />
														<Typography variant='body2' ml='3px'>
															Add Image Here
														</Typography>
													</Box>
													<TextField
														type='file'
														name='image'
														id='image'
														accept='.png,.jpeg,.jpg'
														style={{ display: 'none' }}
														onBlur={handleBlur}
														onChange={(e) =>
															setFieldValue('image', e.currentTarget.files[0])
														}
													/>
												</label>
											</>
										) : (
											<>
												<label htmlFor='image' style={{ cursor: 'pointer' }}>
													<Box
														display='flex'
														justifyContent='space-between'
														alignItems='center'
													>
														<Typography variant='body2'>
															{values.image.name}
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
															name='image'
															id='image'
															accept='.png,.jpeg,.jpg'
															style={{ display: 'none' }}
															onChange={(e) =>
																setFieldValue('image', e.currentTarget.files[0])
															}
														/>
													</Box>
												</label>
											</>
										)}
									</Box>
									{errors.image && Boolean(touched.image) && (
										<p
											style={{
												color: '#d32f2f',
												fontSize: '10px',
												marginBottom: '0',
											}}
										>
											{errors.image}
										</p>
									)}
								</Box>
							</Box>

							{/* Button */}
							<Box
								mt='20px'
								gap='20px'
								display='flex'
								justifyContent='space-between'
								alignItems='center'
							>
								<ButtonComponent type='submit'>CREATE</ButtonComponent>
							</Box>
						</form>
					)}
				</Formik>

				<Box gridColumn='span 4' mt='25px'>
					<Link to='/admin/itemslist'>
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
							Back To Items List ?
						</Typography>
					</Link>
				</Box>
			</FormComponentTop>
		</Box>
	);
};

export default ItemEditScreen;
