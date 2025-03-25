import React, { useState } from 'react';
import { Box, Typography, Tabs, useMediaQuery, Tab } from '@mui/material';
import HomeItems from '../HomeItems';
import { useParams } from 'react-router-dom';
import MostReviewedScreen from '../../../screens/home/MostReviewedScreen';
import TopRatedScreen from '../../../screens/home/TopRatedScreen';

const HomeTabs = () => {
	const [value, setValue] = useState('all');
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const { keyword } = useParams();

	// for tabs
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			{!keyword && (
				<Box margin='50px auto' sx={{ width: { xs: '100%', sm: '80%' } }}>
					<Typography variant='h3' textAlign='center'>
						Our Featured <b>Items</b>
					</Typography>

					<Tabs
						textColor='primary'
						indicatorColor='primary'
						value={value}
						centered
						onChange={handleChange}
						TabIndicatorProps={{
							sx: { display: isNonMobile } ? 'block' : 'none',
						}}
						sx={{
							m: '20px',
							'& .MuiTabs-flexContainer': {
								flexWrap: 'wrap',
							},
						}}
					>
						<Tab
							label='ALL'
							value='all'
							sx={{ fontSize: { xs: '12px', sm: '18px' } }}
						/>
						<Tab
							label='MOST REVIEWED'
							value='mostReviewed'
							sx={{ fontSize: { xs: '12px', sm: '18px' } }}
						/>
						<Tab
							label='TOP RATED'
							value='topRated'
							sx={{ fontSize: { xs: '12px', sm: '18px' } }}
						/>
					</Tabs>
				</Box>
			)}

			{value === 'all' && <HomeItems />}
			{value === 'mostReviewed' && <MostReviewedScreen />}
			{value === 'topRated' && <TopRatedScreen />}
		</>
	);
};

export default HomeTabs;
