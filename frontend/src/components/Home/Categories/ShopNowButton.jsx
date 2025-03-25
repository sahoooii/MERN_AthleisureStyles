import React from 'react';
import { Button } from '@mui/material';
import { shades } from '../../../theme';

const ShopNowButton = () => {
	return (
		<Button
			sx={{
				px: '14px',
				py: '8px',
				backgroundColor: shades.neutral[700],
				color: 'white',
				fontWeight: 600,
				fontSize: '14px',
				'&:hover': { backgroundColor: shades.neutral[500] },
			}}
		>
			SHOP NOW
		</Button>
	);
};

export default ShopNowButton;
