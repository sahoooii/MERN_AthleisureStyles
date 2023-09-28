import React from 'react';
import { Box } from '@mui/material';
import products from '../product';
import HomeTabs from '../components/HomeTabs';
import HomeItems from '../components/HomeItems';

const HomeScreen = () => {
	return (
		<Box margin='120px auto' width='100%'>
			{/* Carousel */}
			<HomeTabs />
			<HomeItems />
		</Box>
	)
};

export default HomeScreen;
