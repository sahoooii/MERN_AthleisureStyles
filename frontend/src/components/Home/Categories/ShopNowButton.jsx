import React from 'react';
import { Button } from '@mui/material';
import { shades } from '../../../theme';

const ShopNowButton = ({ isImageLoaded }) => {
	return (
		<Button
			sx={{
				px: '16px',
				py: '12px',
				backgroundColor: shades.neutral[700],
				color: 'white',
				fontWeight: 600,
				fontSize: '16px',
				'&:hover': { backgroundColor: shades.neutral[500] },
			}}
			style={{
				opacity: isImageLoaded ? '1' : '0',
				transition: 'opacity 1s ease-in-out',
			}}
		>
			SHOP NOW
		</Button>
	);
};

export default ShopNowButton;
