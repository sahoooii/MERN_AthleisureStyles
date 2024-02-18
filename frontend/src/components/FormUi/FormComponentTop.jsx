import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import storeLogoXS from '../../assets/logo/athleisureLogoXS.png';
import { shades } from '../../theme';

const FormComponentTop = ({ title, children }) => {
	const theme = useTheme();
	const isNonMobileScreens = useMediaQuery('(min-width:900px)');

	return (
		<Box>
			<Box
				width={isNonMobileScreens ? '65%' : '93%'}
				// p='2rem'
				m='1.5rem auto'
				borderRadius='1.2rem'
				backgroundColor={theme.palette.neutral.light}
				sx={{ mb: { xs: '100px' } }}
			>
				<Box
					height='100px'
					width='100%'
					borderRadius='1.2rem 1.2rem 0 0'
					backgroundColor={shades.blue[600]}
					display='flex'
					justifyContent='center'
					alignItems='center'
					sx={{
						gap: { xs: 2, sm: 6 },
					}}
				>
					<img src={storeLogoXS} alt='storeLogoXS' />

					<Typography
						fontWeight='bold'
						variant='h4'
						textAlign='center'
						color={shades.babyPink[300]}
					>
						{title}
					</Typography>
				</Box>
				<Box p='2rem'>{children}</Box>
			</Box>
		</Box>
	);
};

export default FormComponentTop;
