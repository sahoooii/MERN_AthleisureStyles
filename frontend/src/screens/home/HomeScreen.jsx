import React from 'react';
import { Box } from '@mui/material';
import HomeTabs from '../../components/Home/HomeTabs';
import HomeCarousel from '../../components/Home/HomeCarousel';
import Meta from '../../components/Utils/Meta';
import HomeCategories from '../../components/Home/Categories/HomeCategories';

const HomeScreen = () => {
	return (
		<Box margin='0 auto' width='100%'>
			<Meta />
			<HomeCarousel />
			<HomeCategories />
			<HomeTabs />
		</Box>
	);
};

export default HomeScreen;
