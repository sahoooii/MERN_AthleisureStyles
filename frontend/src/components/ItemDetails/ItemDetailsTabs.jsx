import React, { useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Divider,
	Grid,
	IconButton,
	Stack,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
} from '@mui/material';
import {
	useDeleteReviewMutation,
	useGetItemDetailsQuery,
} from '../../slices/itemsApiSlice';
import { Close, ExpandMore } from '@mui/icons-material';
import { toast } from 'react-toastify';
import ReviewForm from './ReviewForm';
import Message from '../Utils/Message';
import RatingLogic from '../Utils/RatingLogic';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../Utils/Loader';

const ItemDetailsTabs = () => {
	const isNonMediumScreen = useMediaQuery('(min-width:900px)');

	const { itemId } = useParams();

	// For tabs
	const [value, setValue] = useState('description');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const { userInfo } = useSelector((state) => state.auth);

	const { data: item, refetch, isLoading } = useGetItemDetailsQuery(itemId);

	const [deleteReview] = useDeleteReviewMutation();

	// console.log('item:', item);

	const deleteHandler = async (id) => {
		if (window.confirm('Would you like to delete this review ?')) {
			try {
				await deleteReview(id);

				toast.success('Review deleted successfully');

				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<>
			<Box mb='20px'>
				<Tabs value={value} onChange={handleChange}>
					<Tab label='DESCRIPTION' value='description' />
					<Tab label='REVIEWS' value='reviews' />
				</Tabs>
			</Box>

			<Box display='flex' flexWrap='wrap' gap='15px' mb='120px'>
				{value === 'description' && (
					<Typography
						variant='p'
						sx={{ lineHeight: { sm: 2 }, fontSize: { sm: '14px' } }}
					>
						{item.description}
					</Typography>
				)}
				{/* Reviews */}
				<Box
					flexWrap='wrap'
					width='100%'
					columnGap='40px'
					sx={{ display: { md: 'flex' } }}
				>
					{/* For Tab */}
					{isLoading ? (
						<Loader />
					) : (
						value === 'reviews' && (
							<>
								<Box flex='1 1 40%' mb='20px'>
									{isNonMediumScreen ? (
										<>
											{item.reviews.length === 0 ? (
												<Box mt='20px'>
													<Message>No Reviews Yet</Message>
												</Box>
											) : (
												<Typography variant='h4' mb='15px'>
													{item.numReviews} Reviews
												</Typography>
											)}

											{item.reviews.map((review) => (
												<Box key={review._id}>
													<Stack mt='10px' spacing={1.5}>
														<Grid container display='flex' alignItems='center'>
															<Grid item xs={3}>
																<Avatar src={review.image} />
															</Grid>
															<Grid item xs={7}>
																<Typography variant='p'>
																	<b>{review.name}</b>
																</Typography>
															</Grid>
															<Grid item xs={2} textAlign='right'>
																{userInfo && userInfo._id === review.user && (
																	<IconButton
																		sx={{ mb: '15px' }}
																		onClick={() => deleteHandler(itemId)}
																	>
																		<Close />
																	</IconButton>
																)}
															</Grid>
														</Grid>

														<Grid container display='flex' alignItems='center'>
															<Grid item xs={3}>
																<Typography variant='subtitle2'>
																	{review.createdAt.substring(0, 10)}
																</Typography>
															</Grid>
															<Grid item xs={8}>
																<RatingLogic
																	rating={review.rating}
																></RatingLogic>
															</Grid>
														</Grid>
														<Typography variant='subtitle1'>
															{review.comment}
														</Typography>
													</Stack>
													<Divider sx={{ mt: '10px' }} />
												</Box>
											))}
										</>
									) : (
										<Box mt='10px'>
											<Accordion>
												<AccordionSummary
													expandIcon={<ExpandMore />}
													aria-controls='review-content'
													id='review-header'
												>
													{item.reviews.length === 0 ? (
														<Typography variant='h4'>No Reviews Yet</Typography>
													) : (
														<Typography variant='h4'>
															{item.numReviews} Reviews
														</Typography>
													)}
												</AccordionSummary>

												<AccordionDetails>
													{item.reviews.map((review) => (
														<Grid mt='10px' key={review._id}>
															<Stack mt='10px' spacing={1.5}>
																<Grid
																	container
																	display='flex'
																	alignItems='center'
																>
																	<Grid item xs={3}>
																		<Avatar src={review.image} />
																	</Grid>
																	<Grid item xs={7}>
																		<Typography
																			variant='p'
																			sx={{ lineHeight: 2 }}
																		>
																			<b>{review.name}</b>
																		</Typography>
																	</Grid>
																	<Grid item xs={2} textAlign='right'>
																		{userInfo &&
																			userInfo._id === review.user && (
																				<IconButton
																					sx={{ mb: '15px' }}
																					onClick={() => deleteHandler(itemId)}
																				>
																					<Close />
																				</IconButton>
																			)}
																	</Grid>
																</Grid>

																<Grid
																	container
																	display='flex'
																	alignItems='center'
																>
																	<Grid item xs={3}>
																		<Typography variant='subtitle2'>
																			{review.createdAt.substring(0, 10)}
																		</Typography>
																	</Grid>
																	<Grid item xs={8}>
																		<RatingLogic
																			rating={review.rating}
																		></RatingLogic>
																	</Grid>
																</Grid>
																<Typography variant='subtitle1'>
																	{review.comment}
																</Typography>

																<Divider sx={{ mt: '10px' }} />
															</Stack>
														</Grid>
													))}
												</AccordionDetails>
											</Accordion>
										</Box>
									)}
								</Box>

								{/* Create a Review */}
								<ReviewForm />
							</>
						)
					)}
				</Box>
			</Box>
		</>
	);
};

export default ItemDetailsTabs;
