import React from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { shades } from '../../theme';

const HomeCarousel = () => {
	// Import all images from assets
	const importAllImages = (image) =>
		image.keys().reduce((acc, item) => {
			acc[item.replace('./', '')] = image(item);

			return acc;
		}, {});

	const heroTextureImports = importAllImages(
		require.context('../../assets/carousel', false, /\.(png|jpe?g|svg)$/)
	);

	const isNonMobile = useMediaQuery('(min-width:600px)');

	return (
		<>
			<Carousel
				infiniteLoop={true}
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
							color: 'white',
							p: '5px',
							zIndex: '10',
						}}
					>
						<NavigateBefore sx={{ fontSize: 40 }} />
					</IconButton>
				)}
				renderArrowNext={(onClickHandler, hasNext, label) => (
					<IconButton
						onClick={onClickHandler}
						sx={{
							position: 'absolute',
							top: '50%',
							right: '0',
							color: 'white',
							p: '5px',
							zIndex: '10',
						}}
					>
						<NavigateNext sx={{ fontSize: 40 }} />
					</IconButton>
				)}
			>
				{Object.values(heroTextureImports).map((texture, index) => (
					<Box key={`carousel-image-${index}`}>
						<img
							src={texture}
							alt={`carousel-${index}`}
							style={{ width: '100%', height: '600px', objectFit: 'cover' }}
						/>
					</Box>
				))}
			</Carousel>
		</>
	);
};

export default HomeCarousel;
