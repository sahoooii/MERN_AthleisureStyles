/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import storeLogo from '../../assets/logo/athleisureLogo.png';
import { shades } from '../../theme';

const FormComponent = ({ title, children }) => {
	const isNonMobileScreens = useMediaQuery('(min-width:900px)');

	return (
		<Box>
			<Box
				width={isNonMobileScreens ? '80%' : '95%'}
				p='1.5rem'
				m='1rem auto'
				borderRadius='0.8rem'
				backgroundColor={shades.blue[600]}
				sx={{ mb: { xs: '100px' } }}
			>
				<Typography
					fontWeight='bold'
					variant='h3'
					sx={{ mb: '3rem', mt: '1.5rem' }}
					textAlign='center'
					color={shades.babyPink[300]}
				>
					{title}
				</Typography>

				<Box
					display='flex'
					alignItems='center'
					gap={6}
					justifyContent='space-between'
					mb='30px'
				>
					{isNonMobileScreens ? (
						<img src={storeLogo} alt='storeLogo' width='40%' height='auto' />
					) : (
						''
					)}
					<Box
						backgroundColor={shades.neutral[200]}
						p='2rem'
						borderRadius='0.6rem'
						sx={{ width: { md: '60%', xs: '100%' } }}
					>
						{children}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default FormComponent;
