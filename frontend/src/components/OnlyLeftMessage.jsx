import React from 'react';
import { Typography } from '@mui/material';

const OnlyLeftMessage = ({ item }) => {
	return (
		<>
			{item.countInStock <= 5 && item.countInStock !== 0 && (
				<Typography
					variant='h3'
					color='red'
					sx={{
						'&:hover': { transform: 'scaleY(1.5)', transitionDuration: '0.1s' },
					}}
				>
					{`Only ${item.countInStock} Left!!`}
				</Typography>
			)}
		</>
	);
};

export default OnlyLeftMessage;
