import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { shades } from '../../theme';
import { useParams } from 'react-router-dom';

const HomeCarousel = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const { keyword, pageNumber } = useParams();
	const [getKeyword, setGetKeyword] = useState(keyword || '');

	const [isImageLoaded, setIsImageLoaded] = useState(false); // For loading images

	// Get keyword result
	useEffect(() => {
		if (keyword) {
			setGetKeyword(keyword);
		}
	}, [getKeyword, keyword]);

	// Import all images from assets
	const importAllImages = (image) =>
		image.keys().reduce((acc, item) => {
			acc[item.replace('./', '')] = image(item);

			return acc;
		}, {});

	const heroTextureImports = importAllImages(
		require.context('../../assets/carousel', false, /\.(png|jpe?g|svg)$/)
	);

	const heroMobileTextureImports = importAllImages(
		require.context('../../assets/carousel/mobile', false, /\.(png|jpe?g|svg)$/)
	);

	return (
		<Box mb='40px'>
			{keyword ? (
				<></>
			) : pageNumber ? (
				<></>
			) : (
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
					{/* Images */}
					{Object.values(
						isNonMobile ? heroTextureImports : heroMobileTextureImports
					).map((texture, index, message) => (
						<Box key={`carousel-image-${index}`}>
							{isNonMobile ? (
								<img
									src={texture}
									alt={`carousel-${index}`}
									onLoad={() => setIsImageLoaded(true)} // When loaded images, them true
									style={{
										width: '100%',
										height: '550px',
										objectFit: 'cover',
										backgroundAttachment: 'fixed',
									}}
								/>
							) : (
								<img
									src={texture}
									alt={`carousel-${index}`}
									onLoad={() => setIsImageLoaded(true)}
									style={{
										width: '100%',
										height: '480px',
										objectFit: 'cover',
										backgroundAttachment: 'fixed',
									}}
								/>
							)}
							{/* Subtitle on image */}
							<Box
								color='white'
								padding={isNonMobile ? '20px' : '15px 12px'}
								borderRadius='1px'
								textAlign='left'
								backgroundColor={shades.blue[700]}
								position='absolute'
								bottom={isNonMobile ? '20%' : '10%'}
								right='4%'
								style={{
									opacity: isImageLoaded ? '1' : '0', // After loaded images, then show up
									transition: 'opacity 1s ease-in-out',
								}}
							>
								<Box>
									<Typography variant='h3' textAlign='center' mb='10px'>
										- This is My Kind of Style -
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
						</Box>
					))}
				</Carousel>
			)}
		</Box>
	);
};

export default HomeCarousel;
