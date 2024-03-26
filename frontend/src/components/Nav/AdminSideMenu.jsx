import React from 'react';
import {
	ManageAccountsOutlined,
	ListAltOutlined,
	PostAddOutlined,
} from '@mui/icons-material';

const AdminSideMenu = [
	{
		link: '/admin/userslist',
		icon: (
			<ManageAccountsOutlined sx={{ marginRight: '8px', fontSize: '20px' }} />
		),
		title: 'Users',
	},
	{
		link: '/admin/orderlist',
		icon: <ListAltOutlined sx={{ marginRight: '8px', fontSize: '20px' }} />,
		title: 'Orders',
	},
	{
		link: '/admin/itemslist',
		icon: <PostAddOutlined sx={{ marginRight: '8px', fontSize: '20px' }} />,
		title: 'Items',
	},
];

export default AdminSideMenu;
