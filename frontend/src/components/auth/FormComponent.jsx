/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const FormComponent = ({children}) => {
	const theme = useTheme();
	const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

	return (
		<Box>
			<Box
				width={isNonMobileScreens ? '50%' : '93%'}
				p='2rem'
				m='1.5rem auto'
				borderRadius='1.2rem'
				backgroundColor={theme.palette.neutral.light}
				sx={{ mb: { xs: '100px' } }}
			>
				<Typography
					fontWeight='bold'
					variant='h4'
					sx={{ mb: '1.5rem', mt: '1.5rem' }}
					textAlign='center'
				>
					Welcome to Athleisure Styles, For All SHOPAHOLICS!
				</Typography>
				{children}
			</Box>
		</Box>
	);
};

export default FormComponent;
