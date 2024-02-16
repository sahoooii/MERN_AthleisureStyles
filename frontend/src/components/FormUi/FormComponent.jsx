/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import storeLogo from '../../assets/logo/athleisureLogo.png';
import storeLogoXS from '../../assets/logo/athleisureLogoXS.png';
import storeLogoSM from '../../assets/logo/athleisureLogoSM.png';
import { shades } from '../../theme';
import { Link } from 'react-router-dom';

const FormComponent = ({ title, children }) => {
	const isMdScreens = useMediaQuery('(min-width:900px)');
	const isSmScreens = useMediaQuery('(min-width:600px)');

	return (
		<Box>
			<Box
				width={isMdScreens ? '80%' : '95%'}
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
								sx={{ m: '1.5rem 0' }}
								color={shades.babyPink[300]}
							>
								{title}
							</Typography>
							<Box display='flex' alignItems='center'>
								<Link to='/'>
									<img
										src={storeLogo}
										alt='storeLogo'
										width='80%'
										height='auto'
									/>
								</Link>
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
								gap: { xs: 4, sm: 6 },
							}}
						>
							{isSmScreens ? (
								<>
									<img src={storeLogoSM} alt='storeLogoSM' />
									<Typography
										fontWeight='bold'
										variant='h3'
										color={shades.babyPink[300]}
									>
										{title}
									</Typography>
								</>
							) : (
								<>
									<img src={storeLogoXS} alt='storeLogoXS' />
									<Typography
										fontWeight='bold'
										variant='h4'
										color={shades.babyPink[300]}
									>
										{title}
									</Typography>
								</>
							)}
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
