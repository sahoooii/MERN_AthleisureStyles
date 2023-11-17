import {
	MenuItem,
	ListItemIcon,
	Divider,
	Menu,
	IconButton,
	Avatar,
} from '@mui/material';
import {
	PersonOutline,
	Logout,
	FavoriteBorderOutlined,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import { useState } from 'react';

const MenuLink = ({ style, width, height }) => {
	const { userInfo } = useSelector((state) => state.auth);

	const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			// For server
			await logoutApiCall().unwrap();
			// Clear localStorage userInfo and cart
			dispatch(logout());
			dispatch(resetCart());

			navigate('/login');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<IconButton
				onClick={handleClick}
				aria-controls={open ? 'menu-appBar' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				sx={{ p: 0 }}
				style={style}
			>
				<Avatar
					src={userInfo.picturePath}
					alt={fullName}
					sx={{ width: { width }, height: { height } }}
				/>
			</IconButton>

			<Menu
				sx={{
					mt: { xs: -3.5, sm: 1 },
					ml: { xs: 1 },
				}}
				id='menu-appBar'
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				paper={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
					},
				}}
				transformOrigin={{ horizontal: 'left', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
			>
				<Link to='/myprofile' style={{ textDecoration: 'none' }}>
					<MenuItem
						sx={{ justifyContent: 'space-between' }}
						onClick={handleClose}
					>
						<ListItemIcon>
							<PersonOutline sx={{ marginRight: '6px' }} />
							{fullName}
						</ListItemIcon>
					</MenuItem>
				</Link>
				<Link to='/wishlist' style={{ textDecoration: 'none' }}>
					<MenuItem
						sx={{ justifyContent: 'space-between' }}
						onClick={handleClose}
					>
						<ListItemIcon>
							<FavoriteBorderOutlined sx={{ marginRight: '8px' }} /> Wish List
						</ListItemIcon>
					</MenuItem>
				</Link>

				<Divider />
				<MenuItem
					sx={{ justifyContent: 'space-between', mt: 0.5 }}
					onClick={logoutHandler}
				>
					<ListItemIcon>
						<Logout sx={{ marginRight: '8px' }} /> Logout
					</ListItemIcon>
				</MenuItem>
			</Menu>
		</>
	);
};

export default MenuLink;
