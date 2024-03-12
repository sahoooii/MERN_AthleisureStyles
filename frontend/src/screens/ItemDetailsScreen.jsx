import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	IconButton,
	Box,
	Typography,
	Button,
	useMediaQuery,
} from '@mui/material';
import { Add, Remove, Favorite } from '@mui/icons-material';
import { shades } from '../theme';
import {
	useAddToWishListMutation,
	useGetItemDetailsQuery,
} from '../slices/itemsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RatingLogic from '../components/Utils/RatingLogic';
import ItemDetailsTabs from '../components/ItemDetails/ItemDetailsTabs';
import ButtonComponent from '../components/Utils/ButtonComponent';
import OnlyLeftMessage from '../components/Utils/OnlyLeftMessage';
import Loader from '../components/Utils/Loader';
import Message from '../components/Utils/Message';
import { useGetProfileDetailsQuery } from '../slices/usersApiSlice';
import Meta from '../components/Utils/Meta';

const ItemDetailsScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isNonMobile = useMediaQuery('(min-width:600px)');

	const { itemId, pageNumber } = useParams();

	// Count quantity
	const [quantity, setQuantity] = useState(1);

	const { data, isLoading, error } = useGetItemDetailsQuery({
		itemId,
		pageNumber,
	});

	const { userInfo } = useSelector((state) => state.auth);

	const { data: user, refetch } = useGetProfileDetailsQuery();
	// console.log('user:', user);

	const [addToWishList] = useAddToWishListMutation();

	const alreadyAdded =
		user && user.wishlist.find((list) => list._id.toString() === itemId);
	// console.log('alreadyAdded:', alreadyAdded);

	const addToWishListHandler = async (itemId) => {
		try {
			await addToWishList({
				userId: user._id,
				itemId: itemId,
				alreadyAdded: alreadyAdded,
			}).unwrap();

			refetch();
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	const addToCartHandler = () => {
		dispatch(addToCart({ ...data.item, quantity }));

		navigate('/cart');
	};

	useEffect(() => {
		if (userInfo) {
			refetch();
		}
	}, [userInfo, refetch]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Box margin='0 auto' width='80%'>
					<Message severity='error'>
						{error?.data?.message || error.error}
					</Message>
				</Box>
			) : (
				<Box
					sx={{
						m: { md: '50px auto', xs: '20px auto' },
						width: { xs: '80%', sm: '90%', md: '80%' },
					}}
				>
					<Meta title={data.item.name} description={data.item.description} />
					<Box display='flex' flexWrap='wrap' columnGap='40px'>
						{/* Images */}
						<Box flex='1 1 40%' sx={{ mb: { sm: '40px' } }}>
							{isNonMobile ? (
								<img
									src={data.item.image}
									alt={data.item.name}
									width='100%'
									height='100%'
									style={{ objectFit: 'cover' }}
								/>
							) : (
								<img
									src={data.item.image}
									alt={data.item.name}
									height='400px'
									width='100%'
									style={{ objectFit: 'cover' }}
								/>
							)}
						</Box>

						{/* Right Side over mobile */}
						<Box flex='1 1 50%' mb='40px'>
							<Box m='40px 0 15px 0' sx={{ mt: { sm: '10px', md: '40px' } }}>
								<Typography
									mb='15px'
									sx={{ typography: { md: 'h2', xs: 'h3' } }}
								>
									{data.item.name}
								</Typography>
								<Box mb='5px'>
									<Typography as='span' variant='h4' mr='3px'>
										Brand:
									</Typography>
									<Typography as='span' variant='h4'>
										{data.item.brand}
									</Typography>
								</Box>
								<Typography variant='h3' mb='18px'>
									${data.item.price}
								</Typography>

								{/* Reviews */}
								<Box mb='6px'>
									{data.item.numReviews > 0 ? (
										<Typography variant='span'>
											{data.item.numReviews} Reviews
										</Typography>
									) : (
										<Box sx={{ width: { xs: '90%', sm: '70%', md: '50%' } }}>
											<Message severity='info'>No Reviews Yet</Message>
										</Box>
									)}
								</Box>

								{data.item.rating > 0 && (
									<Box display='flex' alignItems='center' mb='12px'>
										<RatingLogic rating={data.item.rating} />
										<Typography ml='5px'>{data.item.rating}</Typography>
									</Box>
								)}

								{/* Size Button */}
								<Box mb='5px' display='flex' alignItems='center'>
									<Typography as='span' variant='h4' mr='3px'>
										Size:
									</Typography>
									<Typography as='span' variant='h4'>
										One size fits all
									</Typography>
								</Box>
								<Box mb='10px'>
									<Button
										variant='outlined'
										size='large'
										color='primary'
										sx={{
											fontSize: '14px',
											fontFamily: 'Play',
										}}
									>
										ONE SIZE
									</Button>
								</Box>

								{/* Stock */}
								<Box mb='10px'>
									{data.item.countInStock <= 0 && (
										<Typography variant='h3' color='red'>
											Out Of Stock
										</Typography>
									)}
								</Box>

								{/* Count Button */}
								<Box mb='5px'>
									<Typography as='span' variant='h4'>
										Quantity:
									</Typography>
								</Box>

								<Box
									display='flex'
									alignItems='center'
									marginBottom='20px'
									sx={{ mb: { md: '40px' } }}
								>
									<Box
										display='flex'
										alignItems='center'
										border={`1.5px solid ${shades.primary[200]}`}
										mr='20px'
										p='2px 5px'
										justifyContent='space-between'
										borderRadius={1}
										width='120px'
									>
										{/* When quantity=1 add disabled to Remove button */}
										{quantity <= 1 ? (
											<IconButton disabled>
												<Remove />
											</IconButton>
										) : (
											<IconButton
												onClick={() => setQuantity(Math.max(quantity - 1, 1))}
											>
												<Remove />
											</IconButton>
										)}
										<Typography
											sx={{ p: '0 5px' }}
											value={quantity}
											onChange={(e) => setQuantity(Number(e.target.value))}
										>
											{quantity}
										</Typography>
										{/* When count< 0 and over countInStock add disabled to Add button */}
										{data.item.countInStock <= 0 ||
										data.item.countInStock <= quantity ? (
											<IconButton disabled>
												<Add />
											</IconButton>
										) : (
											<IconButton onClick={() => setQuantity(quantity + 1)}>
												<Add />
											</IconButton>
										)}
									</Box>
									{/* Stock Alert */}
									<Box>
										<OnlyLeftMessage item={data.item} />
									</Box>
								</Box>

								{/* Add To Cart */}
								<Box display='flex' alignItems='center'>
									<ButtonComponent
										width='80%'
										disabled={data.item.countInStock <= 0}
										onClick={addToCartHandler}
									>
										ADD TO CART
									</ButtonComponent>

									{/* Add to Wishlist */}
									<IconButton
										disabled={!userInfo}
										sx={{
											alignItems: 'center',
											marginLeft: '8px',
											'&:hover': { color: '#FF0461' },
											color: alreadyAdded && '#FF0461',
										}}
										onClick={() => addToWishListHandler(itemId)}
									>
										<Favorite />
									</IconButton>
								</Box>
							</Box>
						</Box>
					</Box>

					{/* Tabs */}
					<ItemDetailsTabs />
				</Box>
			)}
		</>
	);
};

export default ItemDetailsScreen;
