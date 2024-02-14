import React from 'react';
import { Box } from '@mui/material';
import HomeTabs from '../components/Home/HomeTabs';
import HomeCarousel from '../components/Home/HomeCarousel';

const HomeScreen = () => {
	return (
		<Box margin='0 auto' width='100%'>
			<HomeCarousel />
			<HomeTabs />
		</Box>
	);
};

export default HomeScreen;
