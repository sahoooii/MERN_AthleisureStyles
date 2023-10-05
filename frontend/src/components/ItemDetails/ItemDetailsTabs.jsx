import React, { useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	SentimentVeryDissatisfied,
	SentimentDissatisfied,
	SentimentNeutral,
	SentimentSatisfied,
	SentimentSatisfiedAlt,
} from '@mui/icons-material';
import { shades } from '../../theme';

const ItemDetailsTabs = ({ item }) => {
	// For tabs
	const [value, setValue] = useState('description');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// For review
	const [rating, setRating] = useState('');
	const [comment, setComment] = useState('');

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
				{/* Reviews and Write Review */}
				<Box
					// display='flex'
					flexWrap='wrap'
					width='100%'
					columnGap='40px'
					sx={{ display: { md: 'flex' } }}
				>
					{value === 'reviews' && (
						<>
							{item.numReviews > 0 ? (
								<Box flex='1 1 40%' mb='40px'>
									<Typography
										variant='p'
										sx={{ lineHeight: { sm: 2 }, fontSize: { sm: '14px' } }}
									>
										{item.numReviews} Reviews
									</Typography>
									<Box mt='10px'>
										<Typography variant='p' sx={{ lineHeight: 2 }}>
											Show Reviews... Something reviews coming soon. random text
											text text Show Reviews... Something reviews coming soon.
										</Typography>
									</Box>
								</Box>
							) : (
								<Box flex='1 1 40%'>
									<Typography variant='h4'>No Reviews Yet</Typography>
								</Box>
							)}
							{/* Wrire a Review */}
							<Box flex='1 1 50%' sx={{ marginTop: { xs: '20px' } }}>
								<Box>
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls='panel1a-content'
											id={item._id}
										>
											<Typography variant='h4' sx={{ marginBottom: '0' }}>
												Write a Review:
											</Typography>
										</AccordionSummary>

										<AccordionDetails>
											<form>
												<FormControl fullWidth required>
													<InputLabel id='demo-simple-select-label'>
														Rating
													</InputLabel>
													<Select
														labelId='demo-simple-select-label'
														id='demo-simple-select'
														value={rating}
														label='Rating'
														onChange={(e) => setRating(e.target.value)}
														color='neutral'
													>
														<MenuItem value={1}>
															<Box display='flex' alignItems='center'>
																<SentimentVeryDissatisfied
																	sx={{ marginRight: '5px' }}
																/>
																1 -- Nop I don't like it
															</Box>
														</MenuItem>
														<MenuItem value={2}>
															<Box display='flex' alignItems='center'>
																<SentimentDissatisfied
																	sx={{ marginRight: '5px' }}
																/>
																2 -- Maybe I give it to my sister
															</Box>
														</MenuItem>
														<MenuItem value={3}>
															<Box display='flex' alignItems='center'>
																<SentimentNeutral sx={{ marginRight: '5px' }} />
																3 -- So far, So Good
															</Box>
														</MenuItem>
														<MenuItem value={4}>
															<Box display='flex' alignItems='center'>
																<SentimentSatisfied
																	sx={{ marginRight: '5px' }}
																/>
																4 -- Like it!
															</Box>
														</MenuItem>
														<MenuItem value={5}>
															<Box display='flex' alignItems='center'>
																<SentimentSatisfiedAlt
																	sx={{ marginRight: '5px' }}
																/>
																5 -- Yes!! Love it!
															</Box>
														</MenuItem>
													</Select>
												</FormControl>
												{/* Comment */}
												<FormControl fullWidth>
													<TextField
														type='text'
														label='Comment'
														multiline
														rows={4}
														color='neutral'
														sx={{ mt: '20px' }}
														value={comment}
														onChange={(e) => setComment(e.target.value)}
													/>
												</FormControl>
												<Button
													variant='contained'
													sx={{
														backgroundColor: shades.blue[500],
														color: 'white',
														borderRadius: 1,
														minWidth: '150px',
														padding: '10px 40px',
														width: '80%',
														mt: '20px',
														fontSize: '16px',
														fontFamily: 'Play',
														'&:hover': { backgroundColor: shades.blue[300] },
													}}
												>
													Submit
												</Button>
											</form>
										</AccordionDetails>
									</Accordion>
								</Box>
							</Box>
						</>
					)}
				</Box>
			</Box>
		</>
	);
};

export default ItemDetailsTabs;
