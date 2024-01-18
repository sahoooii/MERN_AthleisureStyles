import React, { useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Divider,
	Stack,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReviewForm from './ReviewForm';
import Message from '../Utils/Message';
import RatingLogic from '../Utils/RatingLogic';

const ItemDetailsTabs = ({ item }) => {
	const isNonMediumScreen = useMediaQuery('(min-width:900px)');

	// For tabs
	const [value, setValue] = useState('description');
	const handleChange = (event, newValue) => {
		setValue(newValue);
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
					{value === 'reviews' && (
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
													<Box display='flex' alignItems='center' gap={8}>
														<Avatar src={review.image} />
														<Typography variant='p' sx={{ lineHeight: 2 }}>
															<b>{review.name}</b>
														</Typography>
													</Box>
													<Box display='flex' alignItems='center' gap={6}>
														<Typography variant='subtitle2'>
															{review.createdAt.substring(0, 10)}
														</Typography>
														<RatingLogic rating={review.rating}></RatingLogic>
													</Box>
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
												expandIcon={<ExpandMoreIcon />}
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
													<Box mt='10px' key={review._id}>
														<Stack mt='10px' spacing={1}>
															<Box display='flex' alignItems='center' gap={8}>
																<Avatar src={review.image} />

																<Typography variant='p' sx={{ lineHeight: 2 }}>
																	<b>{review.name}</b>
																</Typography>
															</Box>
															<Box display='flex' alignItems='center' gap={6}>
																<Typography variant='subtitle2'>
																	{review.createdAt.substring(0, 10)}
																</Typography>
																<RatingLogic
																	rating={review.rating}
																></RatingLogic>
															</Box>
															<Typography variant='subtitle1'>
																{review.comment}
															</Typography>

															<Divider sx={{ mt: '10px' }} />
														</Stack>
													</Box>
												))}
											</AccordionDetails>
										</Accordion>
									</Box>
								)}
							</Box>

							{/* Create a Review */}
							<ReviewForm />
						</>
					)}
				</Box>
			</Box>
		</>
	);
};

export default ItemDetailsTabs;
