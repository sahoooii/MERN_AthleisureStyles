import React, { useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReviewForm from './ReviewForm';
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

			<Box display='flex' flexWrap='wrap' gap='15px' mb='150px'>
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
					{value === 'reviews' && (
						<>
							{item.numReviews > 0 ? (
								<Box flex='1 1 40%' mb='20px'>
									{isNonMediumScreen ? (
										<Box>
											<Typography variant='p' sx={{ fontSize: { sm: '14px' } }}>
												{/* Add Star Average */}
												{item.numReviews} Reviews
											</Typography>
											<Box mt='10px'>
												<Typography variant='p' sx={{ lineHeight: 2 }}>
													Show Reviews... Something reviews coming soon. random
													text text text Show Reviews... Something reviews
													coming soon.
												</Typography>
											</Box>
										</Box>
									) : (
										<Box mt='10px'>
											<Accordion>
												<AccordionSummary
													expandIcon={<ExpandMoreIcon />}
													aria-controls='panel1a-content'
													id={item._id}
												>
													<Typography variant='h4' sx={{ marginBottom: '0' }}>
														{item.numReviews} Reviews:
													</Typography>
												</AccordionSummary>
												<AccordionDetails>
													<Typography variant='p' sx={{ lineHeight: 2 }}>
														Show Reviews... Something reviews coming soon.
														random text text text Show Reviews... Something
														reviews coming soon.
													</Typography>
												</AccordionDetails>
											</Accordion>
										</Box>
									)}
								</Box>
							) : (
								<Box flex='1 1 40%' mt='32px'>
									<Typography variant='p' sx={{ fontSize: { sm: '14px' } }}>
										No Reviews Yet
									</Typography>
								</Box>
							)}
							{/* Write a Review */}
							<ReviewForm item={item} />
						</>
					)}
				</Box>
			</Box>
		</>
	);
};

export default ItemDetailsTabs;
