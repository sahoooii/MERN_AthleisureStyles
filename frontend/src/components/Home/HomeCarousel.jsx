import React from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { shades } from '../../theme';

const HomeCarousel = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	// Import all images from assets
	const importAllImages = (image) =>
		image.keys().reduce((acc, item) => {
			acc[item.replace('./', '')] = image(item);

			return acc;
		}, {});

	const heroTextureImports = importAllImages(
		require.context('../../assets/carousel', false, /\.(png|jpe?g|svg)$/)
	);

	return (
		<Carousel
			infiniteLoop={true}
			autoPlay={true}
			showThumbs={false}
			showIndicators={false}
			showStatus={false}
			renderArrowPrev={(onClickHandler, hasPrev, label) => (
				<IconButton
					onClick={onClickHandler}
					sx={{
						position: 'absolute',
						top: '50%',
						left: '0',
						color: shades.neutral[600],
						p: '5px',
						zIndex: '2',
					}}
				>
					<NavigateBefore sx={{ fontSize: { xs: 28, sm: 40 } }} />
				</IconButton>
			)}
			renderArrowNext={(onClickHandler, hasNext, label) => (
				<IconButton
					onClick={onClickHandler}
					sx={{
						position: 'absolute',
						top: '50%',
						right: '0',
						color: shades.neutral[600],
						p: '5px',
						zIndex: '2',
					}}
				>
					<NavigateNext sx={{ fontSize: { xs: 28, sm: 40 } }} />
				</IconButton>
			)}
		>
			{Object.values(heroTextureImports).map((texture, index, message) => (
				<Box key={`carousel-image-${index}`}>
					{isNonMobile ? (
						<>
							<img
								src={texture}
								alt={`carousel-${index}`}
								style={{
									width: '100%',
									height: '550px',
									objectFit: 'cover',
									backgroundAttachment: 'fixed',
								}}
							/>
							{/* Subtitle on image */}
							<Box
								color='white'
								padding='20px'
								borderRadius='1px'
								textAlign='left'
								backgroundColor={shades.blue[700]}
								position='absolute'
								bottom='20%'
								right='4%'
								style={{ opacity: '0.8' }}
							>
								<Box>
									<Typography variant='h3' textAlign='center' mb='10px'>
										- Just Like This Taste of Styles -
									</Typography>
									<Typography
										variant='h4'
										textAlign='center'
										color={shades.babyPink[400]}
										fontWeight='bold'
									>
										Make Own Your Style
									</Typography>
								</Box>
							</Box>
						</>
					) : (
						<>
							<img
								src={texture}
								alt={`carousel-${index}`}
								style={{
									width: '100%',
									objectFit: 'contain',
									backgroundAttachment: 'fixed',
								}}
							/>

							{/* Subtitle on image */}
							<Box
								color='white'
								padding='12px'
								borderRadius='1px'
								textAlign='left'
								backgroundColor={shades.blue[700]}
								position='absolute'
								bottom='10%'
								right='8%'
								maxWidth='200px'
								style={{ opacity: '0.8' }}
							>
								<Box>
									<Typography variant='h4' textAlign='center' mb='4px'>
										- Just Like This <br /> Taste of Styles -
									</Typography>
									<Typography
										variant='body2'
										textAlign='center'
										color={shades.babyPink[400]}
										fontWeight='bold'
									>
										Make Own Your Style
									</Typography>
								</Box>
								{/* </Box> */}
							</Box>
						</>
					)}
				</Box>
			))}
		</Carousel>
	);
};

export default HomeCarousel;
