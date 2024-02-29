import React from 'react';
import storeLogo from '../assets/logo/athleisureLogoMini.png';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Instagram, Facebook, Twitter } from '@mui/icons-material';
import {
	LocationOnOutlined,
	PhoneIphoneOutlined,
	EmailOutlined,
} from '@mui/icons-material';
import { shades } from '../theme';
import HomeNewsLetter from './Home/HomeNewsLetter';

const Footer = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const currentYear = new Date().getFullYear();

	// Only over SM Screen
	return (
		isNonMobile && (
			// container
			<Box
				component='footer'
				color='white'
				sx={{
					backgroundColor: shades.blue[700],
					pb: '40px',
				}}
			>
				<Box display='flex'>
					{/* Left */}
					<Box flex={1} display='flex' flexDirection='column' p='20px'>
						<img
							src={storeLogo}
							alt='storeLogo'
							style={{ width: '110px', height: 'auto' }}
						/>
						<Typography variant='h4' m='20px 0'>
							We sell Sports and Fashion mixed styles, which we call Athleisure
							Styles. We effort to your life makes better and happier. And
							always inspires you!
						</Typography>
						{/* sns container */}
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 4,
							}}
						>
							<IconButton
								sx={{
									width: ' 40px',
									height: '40px',
								}}
							>
								<Instagram />
							</IconButton>
							<IconButton>
								<Facebook />
							</IconButton>
							<IconButton>
								<Twitter />
							</IconButton>
						</Box>
					</Box>
					{/* Center Address */}
					<Box flex={1} p='20px'>
						<Typography variant='h3' m='20px 0'>
							Contact US
						</Typography>
						<Box mb='20px' display='flex' alignItems='center'>
							<LocationOnOutlined />
							<Typography variant='h4' sx={{ ml: '5px' }}>
								364 Seaside Ave 321, Honolulu HI 98815 USA
							</Typography>
						</Box>
						<Box mb='20px' display='flex' alignItems='center'>
							<PhoneIphoneOutlined />
							<Typography variant='h4' sx={{ ml: '5px' }}>
								+1 808 561 6822
							</Typography>
						</Box>
						<Box mb='20px' display='flex' alignItems='center'>
							<EmailOutlined />
							<Typography variant='h4' sx={{ ml: '5px' }}>
								contact@athelesureStyle.dev
							</Typography>
						</Box>
						{/* Payment */}
					</Box>
					{/* Right NewsLetter */}
					<Box flex={1} p='20px'>
						<HomeNewsLetter />
					</Box>
				</Box>

				<Box
					sx={{
						textAlign: 'center',
						justifyContent: 'center',
						width: '100%',
						alignItems: 'center',
					}}
				>
					<Typography variant='subtitle1'>
						Athleisure Styles &copy; {currentYear}
					</Typography>
				</Box>
			</Box>
		)
	);
};

export default Footer;
