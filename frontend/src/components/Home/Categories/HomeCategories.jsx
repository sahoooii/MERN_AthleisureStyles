import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import CategoryItemTop from './CategoryItemTop';
import CategoryItemBottom from './CategoryItemBottom';

const HomeCategories = () => {
	const categoriesTop = [
		{
			id: 1,
			img: '/images/categories/theNorthFaceJacket.jpg',
			title: 'STYLISH JACKET',
		},

		{
			id: 2,
			img: '/images/categories/adidasTop.jpg',
			title: 'CLASSIC TOP',
		},
		{
			id: 3,
			img: '/images/categories/adidasBottom.jpg',
			title: 'COMFY BOTTOM',
		},
	];

	const categoriesBottom = [
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

	const isNonMobile = useMediaQuery('(min-width:600px)');

	return (
		<>
			{isNonMobile ? (
				<>
					<Box
						mt='10px'
						display='flex'
						alignItems='center'
						justifyContent='space-between'
						p='20px 10px 10px 10px'
					>
						{categoriesTop.map((item) => (
							<Box key={`${item.id}-${item.title}`}>
								<CategoryItemTop item={item} />
							</Box>
						))}
					</Box>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						p='0 20px'
					>
						{categoriesBottom.map((item) => (
							<Box key={`${item.id}-${item.title}`}>
								<CategoryItemBottom item={item} />
							</Box>
						))}
					</Box>
				</>
			) : (
				<>
					<Box
						mt='10px'
						alignItems='center'
						justifyContent='space-between'
						pb='15px'
					>
						{categoriesTop.map((item) => (
							<Box key={`${item.id}-${item.title}`}>
								<CategoryItemTop item={item} />
							</Box>
						))}
					</Box>
					<Box alignItems='center' justifyContent='center' pb='15px'>
						{categoriesBottom.map((item) => (
							<Box key={`${item.id}-${item.title}`}>
								<CategoryItemBottom item={item} />
							</Box>
						))}
					</Box>
				</>
			)}
		</>
	);
};

export default HomeCategories;
