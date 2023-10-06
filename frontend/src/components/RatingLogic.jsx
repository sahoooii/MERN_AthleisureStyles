import React from 'react';
import { Box, Rating } from '@mui/material';
// import { Star, StarHalf, StarBorder } from '@mui/icons-material';

const RatingLogic = ({ rating }) => {
	return (
		<Box>
			<Rating value={rating} precision={0.5} readOnly />
		</Box>
	);
};

export default RatingLogic;
