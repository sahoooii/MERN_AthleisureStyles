import { useRef, useState } from 'react';
import { MenuItem, ListItemIcon, Divider } from '@mui/material';
import {
	PersonOutline,
	Logout,
	FavoriteBorderOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const MenuLink = () => {
	return (
		<>
			<Link to='/myprofile' style={{ textDecoration: 'none' }}>
				<MenuItem sx={{ justifyContent: 'space-between' }}>
					<ListItemIcon>
						<PersonOutline sx={{ marginRight: '6px' }} /> My Profile
					</ListItemIcon>
				</MenuItem>
			</Link>
			<Link to='/wishlist' style={{ textDecoration: 'none' }}>
				<MenuItem sx={{ justifyContent: 'space-between' }}>
					<ListItemIcon>
						<FavoriteBorderOutlined sx={{ marginRight: '8px' }} /> Wish List
					</ListItemIcon>
				</MenuItem>
			</Link>

			<Divider />
			<Link to='/logout' style={{ textDecoration: 'none' }}>
				<MenuItem sx={{ justifyContent: 'space-between' }}>
					<ListItemIcon>
						<Logout sx={{ marginRight: '8px' }} /> Logout
					</ListItemIcon>
				</MenuItem>
			</Link>
		</>
	);
};

export default MenuLink;
