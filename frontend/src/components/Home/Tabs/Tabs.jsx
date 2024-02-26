import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	IconButton,
	Typography,
	Box,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	useMediaQuery,
	Divider,
} from '@mui/material';
import { Favorite, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAddToWishListMutation } from '../../../slices/itemsApiSlice';
import { toast } from 'react-toastify';
import RatingLogic from '../../Utils/RatingLogic';
import Loader from '../../Utils/Loader';
import Message from '../../Utils/Message';
import { shades } from '../../../theme';
import { useGetProfileDetailsQuery } from '../../../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import HomeItems from '../HomeItems';
import Meta from '../../Utils/Meta';

const Tabs = ({
	data,
	isLoading,
	error,
	title,
	typography,
	typographyBold,
}) => {
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const { userInfo } = useSelector((state) => state.auth);

	const { keyword } = useParams();
	const [getKeyword, setGetKeyword] = useState(keyword || '');

	// Get keyword result
	useEffect(() => {
		if (keyword) {
			setGetKeyword(keyword);
		}
	}, [getKeyword, keyword]);

	// For wishlist
	const { data: user, refetch } = useGetProfileDetailsQuery();

	const [addToWishList] = useAddToWishListMutation();

	const addToWishListHandler = async (itemId) => {
		try {
			const alreadyAdded =
				user && user.wishlist.find((list) => list._id.toString() === itemId);

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

	// Check logged out user
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
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					{keyword ? (
						<HomeItems />
					) : (
						<>
							<Meta title={title} />

							<Box mb='35px'>
								<Typography
									variant='h3'
									mb='10px'
									sx={{
										textAlign: !isNonMobile && 'center',
										ml: isNonMobile && '40px',
									}}
								>
									{typography} <b>{typographyBold}</b>
								</Typography>
								<Divider sx={{ ml: '40px', mr: '40px' }} />
							</Box>

							<Box
								margin='0 auto'
								display='grid'
								gridTemplateColumns='repeat(auto-fill, 300px)'
								justifyContent='space-around'
								rowGap='40px'
								columnGap='1.33%'
							>
								{data.map((item) => (
									<Card
										key={item._id}
										sx={{
											width: 300,
											maxWidth: '100%',
											boxShadow: 'md',
										}}
									>
										{item.countInStock === 0 ? (
											<Box position='relative'>
												<CardMedia
													component='img'
													height='400px'
													width='300px'
													image={item.image}
													alt={item.name}
													style={{
														cursor: 'pointer',
														opacity: '0.5',
													}}
													onClick={() => navigate(`/item/${item._id}`)}
												/>
												<Box
													position='absolute'
													width='100%'
													backgroundColor={shades.neutral[700]}
													bottom='0'
													left='0'
													display='flex'
													alignItems='center'
													justifyContent='center'
												>
													<Typography
														variant='h3'
														p='10px 0'
														color='white'
														fontWeight='bold'
													>
														Out Of Stock
													</Typography>
												</Box>
											</Box>
										) : (
											<CardMedia
												component='img'
												height='400px'
												width='300px'
												image={item.image}
												alt={item.name}
												style={{ cursor: 'pointer' }}
												onClick={() => navigate(`/item/${item._id}`)}
											/>
										)}

										<CardContent sx={{ paddingBottom: '8px' }}>
											<Link
												to={`/item/${item._id}`}
												style={{ textDecoration: 'none', color: 'inherit' }}
											>
												<Typography variant='h3' marginBottom='10px'>
													{item.name}
												</Typography>
											</Link>

											{/* Rating */}
											<Box
												display='flex'
												alignItems='center'
												marginBottom='5px'
											>
												{item.rating > 0 && (
													<RatingLogic rating={item.rating} />
												)}
												{item.numReviews > 0 && (
													<Typography variant='subtitle2' ml='8px'>
														{item.numReviews} Reviews
													</Typography>
												)}
											</Box>

											<Box display='flex' justifyContent='space-between'>
												<Typography variant='h3'>${item.price}</Typography>

												{/* Add To Wishlist */}
												{Boolean(
													userInfo &&
														user &&
														user.wishlist &&
														user.wishlist.find((list) => {
															return list._id === item._id;
														})
												) ? (
													<IconButton
														aria-label='add to favorites'
														sx={{
															'&:hover': { color: '#FF0461' },
															color: '#FF0461',
														}}
														onClick={() => addToWishListHandler(item._id)}
													>
														<Favorite />
													</IconButton>
												) : (
													<IconButton
														disabled={!userInfo}
														aria-label='add to favorites'
														sx={{
															'&:hover': { color: '#FF0461' },
														}}
														onClick={() => addToWishListHandler(item._id)}
													>
														<Favorite />
													</IconButton>
												)}
											</Box>
										</CardContent>

										{/* Only Mobile Description show up */}
										{!isNonMobile && (
											<CardActions disableSpacing sx={{ paddingTop: '0' }}>
												<Accordion>
													<AccordionSummary
														expandIcon={<ExpandMore />}
														aria-controls='panel1a-content'
														id={item._id}
													>
														<Typography paragraph sx={{ marginBottom: '0' }}>
															Description:
														</Typography>
													</AccordionSummary>
													<AccordionDetails sx={{ paddingTop: '0' }}>
														<Typography>{item.description}</Typography>
													</AccordionDetails>
												</Accordion>
											</CardActions>
										)}
									</Card>
								))}
							</Box>
						</>
					)}
				</>
			)}
		</>
	);
};

export default Tabs;
