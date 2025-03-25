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
			<Box
				component='footer'
				color='white'
				sx={{
					backgroundColor: shades.blue[700],
					pb: '40px',
					position: 'absolute',
					bottom: 0,
				}}
			>
				<Box display='flex'>
					{/* Left */}
					<Box
						flex={1}
						display='flex'
						flexDirection='column'
						pt='50px'
						px='40px'
					>
						<img
							src={storeLogo}
							alt='storeLogo'
							style={{ width: '110px', height: 'auto' }}
						/>
						<Typography variant='h4' sx={{ mt: '25px', lineHeight: 2 }}>
							Athleisure Styles blends sportswear with fashion, creating
							versatile looks that seamlessly transition from workouts to
							everyday life. We strive to elevate your lifestyle, keeping you
							inspired with fresh ideas every day.{' '}
						</Typography>
						{/* sns container */}
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 4,
								mt: '20px',
							}}
						>
							<IconButton
								sx={{
									width: '40px',
									height: '40px',
									color: shades.blue[400],
									'&:hover': {
										opacity: 0.5,
									},
								}}
							>
								<Instagram sx={{ fontSize: '30px' }} />
							</IconButton>
							<IconButton
								sx={{
									width: '40px',
									height: '40px',
									color: shades.blue[400],
									'&:hover': {
										opacity: 0.5,
									},
								}}
							>
								<Facebook sx={{ fontSize: '30px' }} />
							</IconButton>
							<IconButton
								sx={{
									width: '40px',
									height: '40px',
									color: shades.blue[400],
									'&:hover': {
										opacity: 0.5,
									},
								}}
							>
								<Twitter sx={{ fontSize: '30px' }} />
							</IconButton>
						</Box>
					</Box>
					{/* Center Address */}
					<Box flex={1} pt='50px' px='40px'>
						<Typography variant='h3'>Contact US</Typography>
						<Box my='20px' display='flex' alignItems='center'>
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
					<Box flex={1} pt='50px' px='40px'>
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
