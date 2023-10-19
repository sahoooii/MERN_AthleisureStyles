import React from 'react';
import { Rating } from '@mui/material';
// import { Star, StarHalf, StarBorder } from '@mui/icons-material';

const RatingLogic = ({ rating }) => {
	return <Rating value={rating} precision={0.5} readOnly />;
};

export default RatingLogic;
