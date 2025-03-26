import React, { useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import ShopNowButton from './ShopNowButton';

const CategoryItemTop = ({ item }) => {
	const isMdScreen = useMediaQuery('(min-width:900px)');

	const [isImageLoaded, setIsImageLoaded] = useState(false); // For loading images

	return (
		<>
			<Box
				margin='0 auto'
				display='grid'
				justifyContent='space-around'
				m='3px'
				position='relative'
				sx={{
					gridTemplateColumns: {
						xs: 'repeat(auto-fill, 350px)',
						sm: 'repeat(auto-fill, 238px)',
						md: 'repeat(auto-fill, 320px)',
						lg: 'repeat(auto-fill, 375px)',
					},
					overflow: 'hidden',
					'&:hover': { opacity: 0.5 },
				}}
			>
				<Link to={item.link}>
					{isMdScreen ? (
						<img
							src={item.img}
							alt={item.title}
							width='100%'
							height='500px'
							onLoad={() => setIsImageLoaded(true)} // When loaded images, them true
							style={{ objectFit: 'cover' }}
						/>
					) : (
						<img
							src={item.img}
							alt={item.title}
							width='100%'
							height='357px'
							onLoad={() => setIsImageLoaded(true)} // When loaded images, them true
							style={{ objectFit: 'cover' }}
						/>
					)}
					<Box
						position='absolute'
						width='100%'
						height='100%'
						top='0'
						left='0'
						display='flex'
						alignItems='center'
						flexDirection='column'
						justifyContent='center'
					>
						{isMdScreen ? (
							<Typography
								variant='h2'
								color='white'
								mb='20px'
								p='2px'
								style={{
									opacity: isImageLoaded ? '1' : '0',
									transition: 'opacity 1s ease-in-out',
								}}
							>
								{item.title}
							</Typography>
						) : (
							<Typography
								fontSize='28px'
								fontFamily='Play'
								color='white'
								mb='20px'
								p='2px'
								style={{
									opacity: isImageLoaded ? '1' : '0',
									transition: 'opacity 1s ease-in-out',
								}}
							>
								{item.title}
							</Typography>
						)}
						<ShopNowButton isImageLoaded={isImageLoaded} />
					</Box>
				</Link>
			</Box>
		</>
	);
};

export default CategoryItemTop;
