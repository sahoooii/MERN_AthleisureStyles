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
import Paginate from '../Utils/Paginate';

const ItemDetailsTabs = () => {
	const { itemId, pageNumber } = useParams();

	const isNonMediumScreen = useMediaQuery('(min-width:900px)');

	// For tabs
	const [value, setValue] = useState('description');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const { userInfo } = useSelector((state) => state.auth);

	const { data, refetch, isLoading } = useGetItemDetailsQuery({
		itemId,
		pageNumber,
	});

	// console.log(data && data);

	const [deleteReview] = useDeleteReviewMutation();

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
						{data.item.description}
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
											{data.item.reviews.length === 0 ? (
												<Box mt='20px'>
													<Message>No Reviews Yet</Message>
												</Box>
											) : (
												<Typography variant='h4' mb='15px'>
													{data.item.numReviews} Reviews
												</Typography>
											)}

											{data.paginateItem.map((review) => (
												<Box key={review.reviews._id}>
													<Stack mt='10px' spacing={1.5}>
														<Grid container display='flex' alignItems='center'>
															<Grid item xs={3}>
																<Avatar src={review.reviews.image} />
															</Grid>
															<Grid item xs={7}>
																<Typography variant='p'>
																	<b>{review.reviews.name}</b>
																</Typography>
															</Grid>
															<Grid item xs={2} textAlign='right'>
																{userInfo &&
																	userInfo._id === review.reviews.user && (
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
																	{review.reviews.createdAt.substring(0, 10)}
																</Typography>
															</Grid>
															<Grid item xs={8}>
																<RatingLogic
																	rating={review.reviews.rating}
																></RatingLogic>
															</Grid>
														</Grid>
														<Typography variant='subtitle1'>
															{review.reviews.comment}
														</Typography>
													</Stack>
													<Divider sx={{ mt: '10px' }} />
												</Box>
											))}

											<Paginate
												menu={`/item/${itemId}`}
												pages={data.pages}
												page={data.page}
											/>
										</>
									) : (
										<Box mt='10px'>
											<Accordion>
												<AccordionSummary
													expandIcon={<ExpandMore />}
													aria-controls='review-content'
													id='review-header'
												>
													{data.item.reviews.length === 0 ? (
														<Typography variant='h4'>No Reviews Yet</Typography>
													) : (
														<Typography variant='h4'>
															{data.item.numReviews} Reviews
														</Typography>
													)}
												</AccordionSummary>

												<AccordionDetails>
													{data.paginateItem.map((review) => (
														<Grid mt='10px' key={review.reviews._id}>
															<Stack mt='10px' spacing={1.5}>
																<Grid
																	container
																	display='flex'
																	alignItems='center'
																>
																	<Grid item xs={3}>
																		<Avatar src={review.reviews.image} />
																	</Grid>
																	<Grid item xs={7}>
																		<Typography
																			variant='p'
																			sx={{ lineHeight: 2 }}
																		>
																			<b>{review.reviews.name}</b>
																		</Typography>
																	</Grid>
																	<Grid item xs={2} textAlign='right'>
																		{userInfo &&
																			userInfo._id === review.reviews.user && (
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
																			{review.reviews.createdAt.substring(
																				0,
																				10
																			)}
																		</Typography>
																	</Grid>
																	<Grid item xs={8}>
																		<RatingLogic
																			rating={review.reviews.rating}
																		></RatingLogic>
																	</Grid>
																</Grid>
																<Typography variant='subtitle1'>
																	{review.reviews.comment}
																</Typography>

																<Divider sx={{ mt: '10px' }} />
															</Stack>
														</Grid>
													))}
													<Paginate
														menu={`/item/${itemId}`}
														pages={data.pages}
														page={data.page}
													/>
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
