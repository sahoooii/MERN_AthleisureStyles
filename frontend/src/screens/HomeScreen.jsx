import React from 'react';
import { Box } from '@mui/material';
import products from '../product';
import HomeShoppingList from '../components/HomeShoppingList';

const HomeScreen = () => {
	return (
		<Box>
			{/* Carousel */}
			<HomeShoppingList />
		</Box>
	);
};

export default HomeScreen;
