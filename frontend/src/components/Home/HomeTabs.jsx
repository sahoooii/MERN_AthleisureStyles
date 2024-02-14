import React, { useState } from 'react';
import { Box, Typography, Tabs, useMediaQuery, Tab } from '@mui/material';
import HomeItems from './HomeItems';
import HomeTopRated from './HomeTopRated';

const HomeTabs = () => {
	const [value, setValue] = useState('all');
	const isNonMobile = useMediaQuery('(min-width:600px)');

	// for tabs
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// Get Items from BE

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
			{value === 'mostReviewed' && <p>bb</p>}
			{value === 'topRated' && <HomeTopRated />}
		</>
	);
};

export default HomeTabs;
