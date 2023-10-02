import React from 'react';
import { Box, Rating } from '@mui/material';
// import { Star, StarHalf, StarBorder } from '@mui/icons-material';

const RatingLogic = ({ rating }) => {
	return (
		<Box>
			<Rating value={rating} precision={0.5} readOnly />
		</Box>
		// <Box>
		// 	<Box component='span'>
		// 		{rating >= 1 ? (
		// 			<Star style={starStyle} />
		// 		) : rating >= 0.5 ? (
		// 			<StarHalf style={starStyle} />
		// 		) : (
		// 			<StarBorder style={starStyle} />
		// 		)}
		// 	</Box>
		// 	<Box component='span'>
		// 		{rating >= 2 ? (
		// 			<Star style={starStyle} />
		// 		) : rating >= 1.5 ? (
		// 			<StarHalf style={starStyle} />
		// 		) : (
		// 			<StarBorder style={starStyle} />
		// 		)}
		// 	</Box>
		// 	<Box component='span'>
		// 		{rating >= 3 ? (
		// 			<Star style={starStyle} />
		// 		) : rating >= 2.5 ? (
		// 			<StarHalf style={starStyle} />
		// 		) : (
		// 			<StarBorder style={starStyle} />
		// 		)}
		// 	</Box>
		// 	<Box component='span'>
		// 		{rating >= 4 ? (
		// 			<Star style={starStyle} />
		// 		) : rating >= 3.5 ? (
		// 			<StarHalf style={starStyle} />
		// 		) : (
		// 			<StarBorder style={starStyle} />
		// 		)}
		// 	</Box>
		// 	<Box component='span'>
		// 		{rating >= 5 ? (
		// 			<Star style={starStyle} />
		// 		) : rating >= 4.5 ? (
		// 			<StarHalf style={starStyle} />
		// 		) : (
		// 			<StarBorder style={starStyle} />
		// 		)}
		// 	</Box>
		// </Box>
	);
};

export default RatingLogic;
