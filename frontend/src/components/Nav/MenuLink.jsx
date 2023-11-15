import { MenuItem, ListItemIcon, Divider } from '@mui/material';
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

const MenuLink = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			<Link to='/myprofile' style={{ textDecoration: 'none' }}>
				<MenuItem sx={{ justifyContent: 'space-between' }}>
					<ListItemIcon>
						<PersonOutline sx={{ marginRight: '6px' }} /> {userInfo.firstName}{' '}
						{userInfo.lastName}
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
			{/* <Link to='/logout' style={{ textDecoration: 'none' }}> */}
			<MenuItem
				sx={{ justifyContent: 'space-between' }}
				onClick={logoutHandler}
			>
				<ListItemIcon>
					<Logout sx={{ marginRight: '8px' }} /> Logout
				</ListItemIcon>
			</MenuItem>
			{/* </Link> */}
		</>
	);
};

export default MenuLink;
