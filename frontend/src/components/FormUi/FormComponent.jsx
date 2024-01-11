/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import storeLogo from '../../assets/logo/athleisureLogo.png';
import storeLogoXS from '../../assets/logo/athleisureLogoXS.png';
import storeLogoSM from '../../assets/logo/athleisureLogoSM.png';
import { shades } from '../../theme';

const FormComponent = ({ title, children }) => {
	const isMdScreens = useMediaQuery('(min-width:900px)');
	const isSmScreens = useMediaQuery('(min-width:600px)');

	return (
		<Box>
			<Box
				width={isMdScreens ? '80%' : '95%'}
				// p='1.5rem'
				m='1rem auto'
				borderRadius='0.8rem'
				backgroundColor={shades.blue[600]}
				sx={{ mb: { xs: '100px' } }}
			>
				{isMdScreens ? (
					<Box
						display='flex'
						alignItems='center'
						gap={2}
						justifyContent='space-between'
						mb='30px'
						width='100%'
					>
						<Box width='30%' m='0 auto'>
							<Typography
								fontWeight='bold'
								variant='h3'
								sx={{ mb: '3rem', mt: '1.5rem' }}
								color={shades.babyPink[300]}
							>
								{title}
							</Typography>
							<Box display='flex' alignItems='center'>
								<img
									src={storeLogo}
									alt='storeLogo'
									width='80%'
									height='auto'
								/>
							</Box>
						</Box>

						<Box
							backgroundColor={shades.neutral[200]}
							p='2rem'
							borderRadius='0 0.6rem 0.6rem 0'
							sx={{ width: { md: '60%', xs: '100%' } }}
						>
							{children}
						</Box>
					</Box>
				) : (
					<Box>
						<Box
							width='100%'
							display='flex'
							justifyContent='center'
							alignItems='center'
							sx={{
								p: { xs: '1rem', sm: '1.2rem' },
								height: {
									xs: '100px',
									sm: '150px',
								},
								gap: {xs: 4, sm: 6}
							}}
						>
							{isSmScreens ? (
								<Box>
									<img src={storeLogoSM} alt='storeLogoSM' />
								</Box>
							) : (
								<Box>
									<img src={storeLogoXS} alt='storeLogoXS' />
								</Box>
							)}

							<Box sx={{ width: { xs: '80%', sm: '40%' } }}>
								<Typography
									fontWeight='bold'
									variant='h4'
									color={shades.babyPink[300]}
								>
									{title}
								</Typography>
							</Box>
						</Box>

						<Box
							backgroundColor={shades.neutral[200]}
							p='2rem'
							borderRadius='0 0 0.6rem 0.6rem'
							sx={{ width: { md: '60%', xs: '100%' } }}
						>
							{children}
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default FormComponent;
