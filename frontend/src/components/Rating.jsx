import React from 'react';
import {
	StarBorderOutline,
	StarHalfOutline,
	StarOutline,
} from '@mui/icons-material';
import { Box } from '@mui/material';

const Rating = ({ value, text }) => {
	const starStyle = {
		color: '#f8e825',
	};

	return (
		<Box>
			<Box component='span'>
				{value >= 1 ? (
					<StarOutline />
				) : value >= 0.5 ? (
					<StarHalfOutline />
				) : (
					<StarBorderOutline />
				)}
			</Box>
			<Box component='span'>
				{value >= 2 ? (
					<StarOutline />
				) : value >= 1.5 ? (
					<StarHalfOutline />
				) : (
					<StarBorderOutline />
				)}
			</Box>
			<Box component='span'>
				{value >= 3 ? (
					<StarOutline />
				) : value >= 2.5 ? (
					<StarHalfOutline />
				) : (
					<StarBorderOutline />
				)}
			</Box>
			<Box component='span'>
				{value >= 4 ? (
					<StarOutline />
				) : value >= 3.5 ? (
					<StarHalfOutline />
				) : (
					<StarBorderOutline />
				)}
			</Box>
			<Box component='span'>
				{value >= 5 ? (
					<StarOutline />
				) : value >= 4.5 ? (
					<StarHalfOutline />
				) : (
					<StarBorderOutline />
				)}
			</Box>
			<Box
				component='span'
				// sx={{ fontWeight: '600', fontSize: '0.8rem', paddingLeft: '0.5rem' }}
			>
				{text ? text : null}
			</Box>
		</Box>
	);
};

export default Rating;
