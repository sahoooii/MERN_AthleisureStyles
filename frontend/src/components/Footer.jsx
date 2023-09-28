import React from 'react';
import { AppBar, Box, Container, Typography } from '@mui/material';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	// Only over mobile screen
	return (
		<AppBar
			component='footer'
			color='babyBlue'
			sx={{ top: 'auto', bottom: 0, height: '50px' }}
		>
			<Container
				sx={{
					textAlign: 'center',
					justifyContent: 'center',
					width: '100%',
					margin: 'auto',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Typography variant='subtitle1'>
					Athleisure Styles &copy; {currentYear}
				</Typography>
			</Container>
		</AppBar>
	);
};

export default Footer;
