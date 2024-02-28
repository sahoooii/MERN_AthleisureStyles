import React from 'react';
import { Box } from '@mui/material';
import HomeTabs from '../../components/Home/Tabs/HomeTabs';
import HomeCarousel from '../../components/Home/HomeCarousel';
import Meta from '../../components/Utils/Meta';
import HomeCategories from '../../components/Home/Categories/HomeCategories';
import HomeNewsLetter from '../../components/Home/HomeNewsLetter';

const HomeScreen = () => {
	return (
		<Box margin='0 auto' width='100%'>
			<Meta />
			<HomeCarousel />
			<HomeCategories />
			<HomeTabs />
			<HomeNewsLetter />
		</Box>
	);
};

export default HomeScreen;
