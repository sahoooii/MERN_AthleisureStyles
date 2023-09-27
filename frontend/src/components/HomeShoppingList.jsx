import React, { useState } from 'react';
import { Box, Typography, Tabs, useMediaQuery, Tab } from '@mui/material';

const HomeShoppingList = () => {
	const [value, setValue] = useState('all');
	const isNonMobile = useMediaQuery('(min-width:600px)');

	// for tabs
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// Get Items from BE

	return (
		<Box margin='70px auto' sx={{ width: { xs: '100%', sm: '80%' } }}>
			<Typography variant='h3' textAlign='center'>
				Our Featured <b>Products</b>
			</Typography>

			<Tabs
				textColor='primary'
				indicatorColor='primary'
				value={value}
				centered
				onChange={handleChange}
				TabIndicatorProps={{ sx: { display: isNonMobile } ? 'block' : 'none' }}
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

			{/* Put Images */}
		</Box>
	);
};

export default HomeShoppingList;
