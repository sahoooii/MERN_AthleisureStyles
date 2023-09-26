import React from 'react';
import { AppBar, Box, Container, Typography } from '@mui/material';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	// Only over mobile screen
	return (
		<AppBar
			component='footer'
			color='babyBlue'
			sx={{ top: 'auto', bottom: 0, height: '70px' }}
		>
			<Container sx={{ textAlign: 'center', justifyContent: 'center' }}>
				<Box
					width='80%'
					margin='auto'
					display='flex'
					justifyContent='center'
					alignItems='center'
					height='70px'
				>
					<Typography
						variant='h4'
						sx={{ textAlign: 'center', justifyContent: 'center' }}
					>
						Athleisure Styles &copy; {currentYear}
					</Typography>
				</Box>
			</Container>
		</AppBar>
	);
};

export default Footer;
