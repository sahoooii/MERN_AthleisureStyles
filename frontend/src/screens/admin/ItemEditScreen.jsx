import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	useMediaQuery,
	useTheme,
	TextField,
	Input,
	MenuItem,
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { DeleteSweepOutlined, EditOutlined } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {
	useUpdateItemMutation,
	useUploadItemImageMutation,
	useDeleteItemMutation,
	useGetItemsQuery,
	useGetItemDetailsByAdminQuery,
} from '../../slices/itemsApiSlice';
import FormComponentTop from '../../components/FormUi/FormComponentTop';
import ButtonComponent from '../../components/Utils/ButtonComponent';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';
import Meta from '../../components/Utils/Meta';
import ItemCategoryMenu from '../../components/items/ItemCategoryMenu';
import { useImageSubmitHandler } from '../../hooks/useImageSubmitHandler';
import { itemSchema } from '../../features/items/forms/itemSchema';

const ItemEditScreen = () => {
	const { palette } = useTheme();
	const { id: itemId } = useParams();
	const navigate = useNavigate();

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	// Get each item details
	const {
		data: items,
		isLoading,
		refetch,
		error,
	} = useGetItemDetailsByAdminQuery(itemId);

	const [updateItem, { isLoading: loadingUpdate }] = useUpdateItemMutation();

	// For item Image Upload
	const [uploadItemImage, { isLoading: loadingUpload }] =
		useUploadItemImageMutation();

	// Fo delete Item
	const [deleteItem] = useDeleteItemMutation();

	// After delete item, back to itemsList page, need to refetch
	const { refetch: itemListRefetch } = useGetItemsQuery(itemId);

	const [itemImage, setItemImage] = useState(items && items.image);

	const initialItemsValues = items && {
		name: items.name ? items.name : '',
		price: items.price ? items.price : '',
		image: '',
		brand: items.brand ? items.brand : '',
		category: items.category ? items.category : '',
		code: items.code ? items.code : '',
		countInStock: items.countInStock ? items.countInStock : '',
		description: items.description ? items.description : '',
	};

	useEffect(() => {
		if (items) {
			setItemImage(items.image);
		}
	}, [items]);

	const { submitHandler } = useImageSubmitHandler({
		mutationFn: updateItem,
		uploadMutationFn: uploadItemImage,
		extractFormData: (values) => ({
			file: values.image,
			fieldName: 'image',
		}),
		buildPayload: (values, imageData) => ({
			_id: itemId,
			name: values.name,
			price: values.price,
			brand: values.brand,
			category: values.category,
			code: values.code,
			countInStock: values.countInStock,
			description: values.description,
			image: imageData.image,
		}),
		onSuccess: (response) => {
			toast.success('Item updated successfully');
			refetch();
			navigate('/admin/itemslist');
		},
		onError: (error) => {
			const message =
				error?.data?.message || error.error || 'Something went wrong';
			toast.error(message);
		},
	});

	const updateSubmitHandler = async (values, onSubmitProps) => {
		// console.log('values:', values);
		const { name, price, brand, category, code, countInStock, description } =
			values;

		// When not change itemImage
		if (
			(typeof values.image === 'string' || values.image === '') &&
			values.name &&
			values.price &&
			values.brand &&
			values.category &&
			values.code &&
			values.countInStock
		) {
			try {
				await updateItem({
					_id: itemId,
					name,
					price,
					image: items.image,
					brand,
					category,
					code,
					countInStock,
					description,
				}).unwrap();

				toast.success('Item updated successfully');

				refetch();
				navigate('/admin/itemslist');
			} catch (error) {
				toast.error(error?.data?.message || error.error);
			}
		} else {
			// When changed itemImage
			await submitHandler(values, onSubmitProps);
		}
	};

	// Delete item
	const deleteHandler = async (id) => {
		if (window.confirm('Would you like to delete this item ?')) {
			try {
				await deleteItem(id);

				toast.success('Item deleted successfully');

				itemListRefetch();
				navigate('/admin/itemslist');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<FormComponentTop title='Edit Item'>
			<Box m='0 auto' sx={{ width: { sm: '80%', xs: '100%' } }}>
				{isLoading ? (
					<Loader />
				) : error ? (
					<Box margin='0 auto' width='80%'>
						<Message severity='error'>
							{error?.data?.message || error.error}
						</Message>
					</Box>
				) : (
					<Formik
						initialValues={initialItemsValues}
						validationSchema={itemSchema(true)}
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
								{loadingUpdate && <Loader />}
								<Meta
									title={`${values.name} Edit`}
									description={values.descriptions}
								/>
								{/* Item Image */}
								<Box
									display='flex'
									justifyContent='center'
									alignItems='center'
									mb='15px'
								>
									{loadingUpload && <Loader />}
									<img
										htmlFor='image'
										src={itemImage}
										alt={values.name}
										style={{
											width: 150,
											height: 200,
											objectFit: 'cover',
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
																Change Picture Here
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
																<EditOutlined color='blue' />
															</Box>
															<Input
																type='file'
																name='image'
																id='image'
																accept='.png,.jpeg,.jpg'
																style={{ display: 'none' }}
																onChange={(e) =>
																	setFieldValue(
																		'image',
																		e.currentTarget.files[0]
																	)
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
										select
										label='Item Category'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.category}
										name='category'
										error={
											Boolean(touched.category) && Boolean(errors.category)
										}
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
										label='Item Code'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.code}
										name='code'
										error={Boolean(touched.code) && Boolean(errors.code)}
										helperText={touched.code && errors.code}
										sx={{ gridColumn: 'span 2' }}
									/>
									<TextField
										label={
											values.countInStock === '' ? 'Out of Stock' : 'Item Stock'
										}
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
										rows={6}
										name='description'
										label='Item Description'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.description}
										error={
											Boolean(touched.description) &&
											Boolean(errors.description)
										}
										helperText={touched.description && errors.description}
										sx={{ gridColumn: 'span 4' }}
									/>
								</Box>
								{/* Buttons */}
								<Box
									mt='20px'
									gap='20px'
									display='flex'
									justifyContent='space-between'
									alignItems='center'
								>
									<ButtonComponent type='submit'>UPDATE</ButtonComponent>
									<ButtonComponent
										backgroundColor={shades.neutral[500]}
										type='button'
										onClick={() => deleteHandler(itemId)}
									>
										<DeleteSweepOutlined sx={{ mr: '5px' }} />
										DELETE
									</ButtonComponent>
								</Box>
							</form>
						)}
					</Formik>
				)}

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
			</Box>
		</FormComponentTop>
	);
};

export default ItemEditScreen;
