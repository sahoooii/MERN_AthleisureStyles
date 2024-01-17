import React, { useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Divider,
	Stack,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useGetItemDetailsQuery } from '../../slices/itemsApiSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReviewForm from './ReviewForm';
import Message from '../Utils/Message';
import RatingLogic from '../Utils/RatingLogic';

const ItemDetailsTabs = ({ item, refetch }) => {
	const isNonMediumScreen = useMediaQuery('(min-width:900px)');

	// For tabs
	const [value, setValue] = useState('description');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// console.log(item);

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
					// display='flex'
					flexWrap='wrap'
					width='100%'
					columnGap='40px'
					sx={{ display: { md: 'flex' } }}
				>
					{/* For Tab */}
					{value === 'reviews' && (
						<>
							<Box flex='1 1 40%' mb='20px'>
								{item.reviews.length === 0 && (
									<Box mt='20px'>
										<Message>No Reviews Yet</Message>
									</Box>
								)}

								{item.reviews.map((review) => (
									<Box key={review._id}>
										{isNonMediumScreen ? (
											<Box>
												<Typography
													variant='p'
													sx={{ fontSize: { sm: '14px' } }}
												>
													{/* Add Star Average */}
													{item.numReviews} Reviews
												</Typography>

												<Stack mt='10px' spacing={1}>
													<Box
														display='flex'
														alignItems='center'
														gap={8}
													>
														<Typography variant='p' sx={{ lineHeight: 2 }}>
															<b>{review.name}</b>
														</Typography>
														<RatingLogic rating={review.rating}></RatingLogic>
													</Box>
													<Typography variant='subtitle2'>
														{review.createdAt.substring(0, 10)}
													</Typography>
													<Typography variant='subtitle1'>
														{review.comment}
													</Typography>
												</Stack>
												<Divider sx={{ mt: '10px' }} />
											</Box>
										) : (
											<Box mt='10px'>
												<Accordion>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls='panel1a-content'
														id={review._id}
													>
														<Typography variant='h4' sx={{ marginBottom: '0' }}>
															{item.numReviews} Reviews:
														</Typography>
													</AccordionSummary>

													<AccordionDetails>
														<Box mt='10px'>
															<Typography variant='p' sx={{ lineHeight: 2 }}>
																<b>{review.name}</b>
															</Typography>
															<RatingLogic rating={review.rating}></RatingLogic>
															<Typography variant='subtitle2'>
																{review.createdAt.substring(0, 10)}
															</Typography>
															<Typography variant='subtitle1'>
																{review.comment}
															</Typography>
														</Box>
													</AccordionDetails>
												</Accordion>
											</Box>
										)}
									</Box>
								))}
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
