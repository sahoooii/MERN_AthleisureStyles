import React from 'react';
import { Box, Button } from '@mui/material';
import { shades } from '../theme';

const SubmitButton = ({ children }) => {
	return (
		<Box display='flex' alignItems='center'>
			<Button
				variant='contained'
				sx={{
					backgroundColor: shades.blue[500],
					color: 'white',
					borderRadius: 1,
					minWidth: '150px',
					padding: '10px 40px',
					width: '80%',
					fontSize: '16px',
					fontFamily: 'Play',
					'&:hover': { backgroundColor: shades.blue[300] },
				}}
			>
				{children}
			</Button>
		</Box>
	);
};

export default SubmitButton;
