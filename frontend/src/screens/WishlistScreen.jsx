import React from 'react';
import {
	Box,
	Divider,
	IconButton,
	Typography,
	Grid,
	Stack,
	useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Favorite } from '@mui/icons-material';
import Message from '../components/Utils/Message';
import { useAddToWishListMutation } from '../slices/itemsApiSlice';
import { useGetProfileDetailsQuery } from '../slices/usersApiSlice';
import OnlyLeftMessage from '../components/OnlyLeftMessage';
import Loader from '../components/Utils/Loader';

const WishlistScreen = () => {
	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const { data: user, isLoading, refetch } = useGetProfileDetailsQuery();
	// console.log(user);

	const [addToWishList] = useAddToWishListMutation();

	const removeFromWishList = async (itemId) => {
		try {
			const alreadyAdded =
				user && user.wishlist.find((list) => list._id.toString() === itemId);

			if (
				window.confirm(
					'Would you like to remove this item from your Wishlist ?'
				)
			) {
				await addToWishList({
					userId: user._id,
					itemId: itemId,
					alreadyAdded: alreadyAdded,
				}).unwrap();

				refetch();
			}
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

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
									<Typography variant='h3'>
										Your <b>Wishlist</b>
									</Typography>
								</Box>

								{/* Shopping Cart */}
								<Box>
									{user.wishlist.map((list) => (
										<Box key={list._id}>
											<Grid container m='15px 0'>
												<Grid item sm={4} xs={5}>
													{isNonMobileScreen ? (
														<img
															src={list.image}
															alt={list.name}
															width='123px'
															height='174px'
															style={{
																borderRadius: '3px',
															}}
														/>
													) : (
														<img
															src={list.image}
															alt={list.name}
															width='110px'
															height='150px'
															style={{
																borderRadius: '3px',
															}}
														/>
													)}
												</Grid>

												<Grid
													item
													sm={7}
													xs={6}
													sx={{
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<Stack spacing={1} sx={{ alignContent: 'center' }}>
														<Link
															to={`/item/${list._id}`}
															style={{ textDecoration: 'underline' }}
														>
															<Typography
																sx={{ fontSize: { xs: '14px', sm: '18px' } }}
																fontWeight='bold'
																color='secondary'
															>
																{list.name}
															</Typography>
														</Link>

														<Box>
															<Typography as='span' variant='h4' mr='3px'>
																Brand:
															</Typography>
															<Typography as='span' variant='h4'>
																{list.brand}
															</Typography>
														</Box>

														{isNonMobileScreen ? (
															<Typography variant='h3' fontWeight='bold'>
																${list.price}
															</Typography>
														) : (
															<Box
																display='flex'
																alignItems='center'
																justifyContent='space-between'
															>
																<Typography variant='h3' fontWeight='bold'>
																	${list.price}
																</Typography>

																<IconButton
																	sx={{
																		'&:hover': { color: '#FF0461' },
																		// mr: '30px',
																	}}
																	onClick={() => removeFromWishList(list._id)}
																>
																	<Favorite />
																</IconButton>
															</Box>
														)}

														{list.countInStock <= 0 && (
															<Typography variant='h4' color='red'>
																Out Of Stock
															</Typography>
														)}
														{/* Stock Alert */}
														{list.countInStock <= 5 &&
															list.countInStock > 0 && (
																<OnlyLeftMessage item={list}>
																	{`Only ${list.countInStock} Left!!`}
																</OnlyLeftMessage>
															)}
													</Stack>
												</Grid>
												{/* Remove from Wishlist*/}
												{isNonMobileScreen && (
													<Grid item sm={1}>
														<IconButton
															sx={{ '&:hover': { color: '#FF0461' } }}
															onClick={() => removeFromWishList(list._id)}
														>
															<Favorite />
														</IconButton>
													</Grid>
												)}
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
