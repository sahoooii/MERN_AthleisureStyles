import React, { useEffect, useState } from 'react';
import { Box, Typography, Tabs, useMediaQuery, Tab } from '@mui/material';
import HomeItems from './HomeItems';
import HomeTopRated from './HomeTopRated';
import HomeMostReviewed from './HomeMostReviewed';
import { useParams } from 'react-router-dom';

const HomeTabs = () => {
	const [value, setValue] = useState('all');
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const { keyword } = useParams();

	const [getKeyword, setGetKeyword] = useState(keyword || '');

	// Get keyword result
	useEffect(() => {
		if (keyword) {
			setGetKeyword(keyword);
		}
	}, [getKeyword, keyword]);

	// for tabs
	const handleChange = (event, newValue) => {
		if (keyword) {
			setValue('all');
		} else {
			setValue(newValue);
		}
	};

	return (
		<>
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
					<Tab label='ALL' value='all' />
					<Tab label='MOST REVIEWED' value='mostReviewed' />
					<Tab label='TOP RATED' value='topRated' />
				</Tabs>
			</Box>

			{value === 'all' && <HomeItems />}
			{value === 'mostReviewed' && <HomeMostReviewed />}
			{value === 'topRated' && <HomeTopRated />}
		</>
	);
};

export default HomeTabs;
