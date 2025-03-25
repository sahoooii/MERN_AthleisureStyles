import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import ShopNowButton from './ShopNowButton';

const CategoryItemBottom = ({ item }) => {
	const isMdScreen = useMediaQuery('(min-width:900px)');

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
						md: 'repeat(auto-fill, 475px)',
						lg: 'repeat(auto-fill, 570px)',
					},
					'&:hover': { opacity: 0.5 },
				}}
			>
				<Link to={item.link}>
					<img
						src={item.img}
						alt={item.title}
						width='100%'
						height='357px'
						style={{ objectFit: 'cover' }}
					/>
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
							<Typography variant='h2' color='white' mb='20px'>
								{item.title}
							</Typography>
						) : (
							<Typography
								fontSize='28px'
								fontFamily='Play'
								color='white'
								mb='20px'
							>
								{item.title}
							</Typography>
						)}
						<ShopNowButton />
					</Box>
				</Link>
			</Box>
		</>
	);
};

export default CategoryItemBottom;
