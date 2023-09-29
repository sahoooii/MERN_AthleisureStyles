import React from 'react';
import { Box } from '@mui/material';
import HomeTabs from '../components/Home/HomeTabs';
import HomeItems from '../components/Home/HomeItems';

const HomeScreen = () => {
	return (
		<Box margin='120px auto' width='100%'>
			{/* Carousel */}
			<HomeTabs />
			<HomeItems />
		</Box>
	);
};

export default HomeScreen;
