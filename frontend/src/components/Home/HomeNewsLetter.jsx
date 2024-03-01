import React from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { SendOutlined, ContactMailOutlined } from '@mui/icons-material';
import { shades } from '../../theme';

const HomeNewsLetter = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const adminMail = 'contact@athelesureStyle.dev';

	return (
		isNonMobile && (
			<Box display='flex' flexDirection='column' m='20px 0'>
				<Box mb='20px' display='flex' alignItems='center'>
					<ContactMailOutlined sx={{ mr: '10px' }} />
					<Typography variant='h3' fontWeight={300}>
						News Letter
					</Typography>
				</Box>

				<Link
					to={`mailto:${adminMail}`}
					style={{
						color: 'white',
						'&:hover': {
							opacity: 0.5,
						},
					}}
				>
					<Box mb='30px' display='flex' alignItems='center'>
						<Typography
							variant='h4'
							sx={{
								fontSize: { md: '16px' },
								borderBottom: '1px solid white',
								paddingBottom: '5px',
								'&:hover': {
									opacity: 0.5,
								},
							}}
						>
							Join US to Athleisure Family
						</Typography>
						<IconButton
							sx={{
								color: shades.blue[400],
								'&:hover': {
									opacity: 0.5,
								},
							}}
						>
							<SendOutlined />
						</IconButton>
					</Box>
				</Link>
			</Box>
		)
	);
};

export default HomeNewsLetter;
