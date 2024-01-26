import React from 'react';
import {
	Box,
	Divider,
	IconButton,
	Typography,
	Grid,
	Stack,
	Select,
	InputLabel,
	FormControl,
	MenuItem,
	Card,
	CardContent,
	CardActions,
	useMediaQuery,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import ButtonComponent from '../components/Utils/ButtonComponent';
import Message from '../components/Utils/Message';
import CloseIcon from '@mui/icons-material/Close';
import {
	useAddToWishListMutation,
	useGetItemDetailsQuery,
} from '../slices/itemsApiSlice';
import { useGetProfileDetailsQuery } from '../slices/usersApiSlice';
import RatingLogic from '../components/Utils/RatingLogic';
import Loader from '../components/Utils/Loader';

const WishlistScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const { userInfo } = useSelector((state) => state.auth);

	const { data: user, isLoading, refetch } = useGetProfileDetailsQuery();
	// console.log(user && user.wishlist.map((id) => id));

	const [
		addToWishList,
		{ isLoading: loadingWishlist, refetch: refetchWishlist },
	] = useAddToWishListMutation();

	// const {
	// 	data: item,
	// 	isLoading: itemLoading,
	// 	error,
	// } = useGetItemDetailsQuery(itemId);

	return (
		<Box margin='0 auto' sx={{ width: { xs: '95%', sm: '80%' } }}>
			{isLoading ? (
				<Loader />
			) : user.wishlist.length === 0 ? (
				<Message severity='error'>
					Oh No! Your Wishlist is Empty!
					<Link to='/'> - Go Back</Link>
				</Message>
			) : (
				<Box alignItems='center'>
					<Grid container mt='15px'>
						<Grid item md={12} xs={12}>
							<Box>
								<Box mb='30px'>
									<Typography variant='h3'>Your Wishlist</Typography>
								</Box>

								{/* Shopping Cart */}
								<Box>
									{user.wishlist.map((wishlist) => (
										<Box key={wishlist._id}>
											<Grid container m='15px 0'>
												{/* <Grid item sm={4} xs={5}>
													{isNonMobileScreen ? (
														<img
															src={item.image}
															alt={item.name}
															width='123px'
															height='164px'
															style={{
																borderRadius: '3px',
															}}
														/>
													) : (
														<img
															src={item.image}
															alt={item.name}
															width='100px'
															height='140px'
															style={{
																borderRadius: '3px',
															}}
														/>
													)}
												</Grid> */}
												{/* <Grid
													item
													sm={7}
													xs={6}
													sx={{
														mt: { sm: '12px', xs: '8px' },
														mb: '10px',
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<Stack spacing={2} sx={{ alignContent: 'center' }}>
														<Link
															to={`/item/${item._id}`}
															style={{ textDecoration: 'underline' }}
														>
															<Typography
																sx={{ fontSize: { xs: '14px', sm: '18px' } }}
																fontWeight='bold'
																color='secondary'
															>
																{item.name}
															</Typography>
														</Link>

														{isNonMobileScreen && (
															<Box display='flex' alignItems='center' mb='12px'>
																{item.rating > 0 && (
																	<RatingLogic rating={item.rating} />
																)}
																{item.numReviews > 0 ? (
																	<Typography variant='span' ml='8px'>
																		{item.numReviews} Reviews
																	</Typography>
																) : (
																	<Box>
																		<Message severity='info'>
																			No Reviews Yet
																		</Message>
																	</Box>
																)}
															</Box>
														)}

														<Typography variant='h3' fontWeight='bold'>
															${item.price}
														</Typography>
													</Stack>
												</Grid> */}
												{/* Delete Items Button */}
												<Grid item xs={1} sm={1}>
													<IconButton
														// onClick={() => removeFromCartHandler(item._id)}
													>
														<CloseIcon />
													</IconButton>
												</Grid>
											</Grid>
											<Divider />
										</Box>
									))}
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	);
};

export default WishlistScreen;
