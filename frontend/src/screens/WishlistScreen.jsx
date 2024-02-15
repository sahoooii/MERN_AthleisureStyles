import React from 'react';
import {
	Box,
	Divider,
	IconButton,
	Typography,
	Grid,
	Stack,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Favorite } from '@mui/icons-material';
import Message from '../components/Utils/Message';
import { useAddToWishListMutation } from '../slices/itemsApiSlice';
import { useGetUserWishlistQuery } from '../slices/usersApiSlice';
import OnlyLeftMessage from '../components/OnlyLeftMessage';
import Loader from '../components/Utils/Loader';
import Paginate from '../components/Utils/Paginate';
import { shades } from '../theme';

const WishlistScreen = () => {
	const { palette } = useTheme();
	const navigate = useNavigate();
	const { pageNumber } = useParams();

	const isNonMobileScreen = useMediaQuery('(min-width:600px)');
	const { data, isLoading, refetch } = useGetUserWishlistQuery({ pageNumber });
	// console.log(data);

	const [addToWishList] = useAddToWishListMutation();

	const removeFromWishList = async (itemId) => {
		try {
			const alreadyAdded =
				data &&
				data.user.wishlist.find((list) => list._id.toString() === itemId);

			if (
				window.confirm(
					'Would you like to remove this item from your Wishlist ?'
				)
			) {
				await addToWishList({
					userId: data.user._id,
					itemId: itemId,
					alreadyAdded: alreadyAdded,
				}).unwrap();

				refetch();

				navigate('/wishlist');
			}
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<Box margin='0 auto' sx={{ width: { xs: '95%', sm: '80%' } }}>
			{isLoading ? (
				<Loader />
			) : data.user.wishlist.length === 0 ? (
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
									<Link to='/wishlist'>
										<Typography variant='h3'>
											Your <b>Wishlist</b> ({data.user.wishlist.length})
										</Typography>
									</Link>
								</Box>
								<Box>
									{data.paginatedUser.map((list) => (
										<Box key={list.wishlist._id}>
											<Grid container m='15px 0'>
												<Grid item sm={4} xs={5}>
													{isNonMobileScreen ? (
														<img
															src={list.wishlist.image}
															alt={list.wishlist.name}
															width='130px'
															height='174px'
															style={{
																borderRadius: '3px',
															}}
														/>
													) : (
														<img
															src={list.wishlist.image}
															alt={list.wishlist.name}
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
															to={`/item/${list.wishlist._id}`}
															style={{ textDecoration: 'underline' }}
														>
															<Typography
																sx={{ fontSize: { xs: '14px', sm: '18px' } }}
																fontWeight='bold'
																color='secondary'
															>
																{list.wishlist.name}
															</Typography>
														</Link>

														<Typography as='span' variant='h4'>
															{list.wishlist.brand}
														</Typography>

														{isNonMobileScreen ? (
															<Typography variant='h3' fontWeight='bold'>
																${list.wishlist.price}
															</Typography>
														) : (
															<Box
																display='flex'
																alignItems='center'
																justifyContent='space-between'
															>
																<Typography variant='h3' fontWeight='bold'>
																	${list.wishlist.price}
																</Typography>

																<IconButton
																	sx={{
																		'&:hover': { color: shades.neutral[700] },
																		color: '#FF0461',
																		// mr: '30px',
																	}}
																	onClick={() =>
																		removeFromWishList(list.wishlist._id)
																	}
																>
																	<Favorite />
																</IconButton>
															</Box>
														)}

														{list.wishlist.countInStock <= 0 && (
															<Typography variant='h4' color='red'>
																Out Of Stock
															</Typography>
														)}
														{/* Stock Alert */}
														{list.wishlist.countInStock <= 5 &&
															list.wishlist.countInStock > 0 && (
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
															sx={{
																'&:hover': { color: shades.neutral[700] },
																color: '#FF0461',
															}}
															onClick={() =>
																removeFromWishList(list.wishlist._id)
															}
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
								<Paginate
									menu='/wishlist'
									pages={data.pages}
									page={data.page}
								/>

								<Box mt='20px'>
									<Link to='/'>
										<Typography
											variant='h4'
											sx={{
												textDecoration: 'underline',
												color: palette.blue.main,
												'&:hover': {
													cursor: 'pointer',
													color: palette.blue.light,
												},
											}}
										>
											Back To Home?
										</Typography>
									</Link>
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
