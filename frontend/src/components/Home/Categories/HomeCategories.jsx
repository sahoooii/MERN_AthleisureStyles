import React from 'react';
import { Box, Card, CardMedia } from '@mui/material';

const HomeCategories = () => {
	const categories = [
		{
			id: 1,
			img: '/images/categories/adidasTop.jpg',
			title: 'CLASSIC TOP',
		},
		{
			id: 2,
			img: '/images/categories/theNorthFaceJacket.jpg',
			title: 'STYLISH JACKET',
		},
		{
			id: 3,
			img: '/images/categories/adidasBottom.jpg',
			title: 'COMFY BOTTOM',
		},
		{
			id: 4,
			img: '/images/categories/cap.jpg',
			title: 'COOL CAP',
		},
		{
			id: 5,
			img: '/images/categories/nikeSocks.jpg',
			title: 'THE PERFECT ACCESSORIES',
		},
	];

	return (
		<Box>
			{categories.map((category) => (
				<Box
					key={`category.id-${category.title}`}
					display='flex'
					alignItems='center'
					justifyContent='space-between'
				>
					<Card
						sx={{
							width: 300,
							maxWidth: '100%',
							// boxShadow: 'md',
						}}
					>
						<CardMedia
							component='img'
							height='400px'
							width='300px'
							image={category.img}
							alt={category.title}
							style={{
								cursor: 'pointer',
								opacity: '0.5',
								// objectFit: 'cover',
							}}
						/>
					</Card>
				</Box>
			))}
		</Box>
	);
};

export default HomeCategories;
