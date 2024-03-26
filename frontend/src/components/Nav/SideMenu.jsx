import React from 'react';
import {
	PersonOutline,
	FavoriteBorderOutlined,
	ManageSearchOutlined,
	ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';

const SideMenu = [
	{
		link: '/profile',
		icon: <PersonOutline sx={{ marginRight: '8px', fontSize: '20px' }} />,
		title: '',
	},
	{
		link: '/orderhistory',
		icon: (
			<ManageSearchOutlined sx={{ marginRight: '8px', fontSize: '20px' }} />
		),
		title: 'Order History',
	},
	{
		link: '/notpaidorders',
		icon: (
			<ProductionQuantityLimitsOutlined
				sx={{ marginRight: '8px', fontSize: '20px' }}
			/>
		),
		title: 'Not Paid Order',
	},
	{
		link: '/wishlist',
		icon: (
			<FavoriteBorderOutlined sx={{ marginRight: '8px', fontSize: '20px' }} />
		),
		title: 'Wish List',
	},
];

export default SideMenu;
