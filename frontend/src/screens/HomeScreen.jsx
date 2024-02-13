import React from 'react';
import { Box } from '@mui/material';
import HomeTabs from '../components/Home/HomeTabs';
import HomeItems from '../components/Home/HomeItems';
import HomeCarousel from '../components/Home/HomeCarousel';

const HomeScreen = () => {
	return (
		<Box margin='0 auto' width='100%'>
			<HomeCarousel />
			<HomeTabs />
			{/* <HomeItems /> */}
		</Box>
	);
};

export default HomeScreen;
