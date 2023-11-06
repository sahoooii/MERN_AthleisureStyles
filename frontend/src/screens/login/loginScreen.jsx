/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import LoginRegisterForm from './LoginRegisterForm';

const loginScreen = () => {
	const theme = useTheme();
	const isNonMobileScreen = useMediaQuery('(min-width:1000px)');

	return (
		<Box>
			<Box
				width={isNonMobileScreen ? '50%' : '93%'}
				p='2rem'
				m='2rem auto'
				borderRadius='1.5rem'
				backgroundColor={theme.palette.neutral.light}
			>
				<Typography
					fontWeight='bold'
					variant='h4'
					sx={{ mb: '1.5rem', mt: '1.5rem' }}
					textAlign='center'
				>
					Welcome to Athleisure Styles, For All SHOPAHOLICS!
				</Typography>
				<LoginRegisterForm />
			</Box>
		</Box>
	);
};

export default loginScreen;
