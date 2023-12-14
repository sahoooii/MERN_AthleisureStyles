import {
	MenuItem,
	ListItemIcon,
	Divider,
	IconButton,
	Avatar,
	Box,
	MenuList,
	Stack,
	Typography,
} from '@mui/material';
import {
	PersonOutline,
	ManageSearchOutlined,
	Logout,
	FavoriteBorderOutlined,
	CloseOutlined,
	ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import { useState } from 'react';
import styled from '@emotion/styled';
import { shades } from '../../theme';

const MenuLink = ({ style, width, height }) => {
	const { userInfo } = useSelector((state) => state.auth);

	const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isMenuToggled, setIsMenuToggled] = useState(false);

	const FlexBox = styled(Box)`
		display: flex;
		justify-content: space-between;
		align-items: center;
	`;

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
				onClick={() => setIsMenuToggled(!isMenuToggled)}
				sx={{ p: 0 }}
				style={style}
			>
				<Avatar
					src={userInfo.picturePath}
					alt={fullName}
					sx={{ width: { width }, height: { height } }}
				/>
			</IconButton>

			{/* Overlay */}
			<Box
				display={isMenuToggled ? 'block' : 'none'}
				backgroundColor='rgba(0,0,0,0.4)'
				position='fixed'
				zIndex={10}
				width='100%'
				height='100%'
				left='0'
				top='0'
				overflow='auto'
			>
				{/* Modal */}
				<Box
					position='fixed'
					right='0'
					bottom='0'
					height='100%'
					backgroundColor='white'
					sx={{ width: { xs: 1, sm: 'max(350px, 25%)' } }}
				>
					<Box
						padding='30px'
						width='80%'
						m='0 auto'
						overflow='auto'
						height='100%'
					>
						<Box display='flex' justifyContent='flex-end' mb='15px' mr='8px'>
							<IconButton onClick={() => setIsMenuToggled(!isMenuToggled)}>
								<CloseOutlined />
							</IconButton>
						</Box>

						{/* Menu */}
						<Box>
							<MenuList>
								<Stack spacing={2}>
									<FlexBox>
										<Link to='/myprofile' style={{ textDecoration: 'none' }}>
											<MenuItem style={{ alignItems: 'center' }}>
												<ListItemIcon>
													<PersonOutline
														sx={{ marginRight: '6px', fontSize: '20px' }}
													/>
												</ListItemIcon>
												<Typography
													variant='h3'
													sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
												>
													{fullName}
												</Typography>
											</MenuItem>
										</Link>
									</FlexBox>
									<FlexBox>
										<Link to='/orderhistory' style={{ textDecoration: 'none' }}>
											<MenuItem sx={{ alignItems: 'center' }}>
												<ListItemIcon>
													<ManageSearchOutlined
														sx={{ marginRight: '8px', fontSize: '20px' }}
													/>
												</ListItemIcon>
												<Typography
													variant='h3'
													sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
												>
													Order History
												</Typography>
											</MenuItem>
										</Link>
									</FlexBox>
									<FlexBox>
										<Link
											to='/orderhistory/notpaid'
											style={{ textDecoration: 'none' }}
										>
											<MenuItem sx={{ alignItems: 'center' }}>
												<ListItemIcon>
													<ProductionQuantityLimitsOutlined
														sx={{ marginRight: '8px', fontSize: '20px' }}
													/>
												</ListItemIcon>
												<Typography
													variant='h3'
													sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
												>
													Not Paid Order
												</Typography>
											</MenuItem>
										</Link>
									</FlexBox>
									<FlexBox>
										<Link to='/wishlist' style={{ textDecoration: 'none' }}>
											<MenuItem sx={{ display: 'flex', alignItems: 'center' }}>
												<ListItemIcon>
													<FavoriteBorderOutlined
														sx={{ marginRight: '8px', fontSize: '20px' }}
													/>
												</ListItemIcon>
												<Typography
													variant='h3'
													sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
												>
													Wish List
												</Typography>
											</MenuItem>
										</Link>
									</FlexBox>

									<Divider />
									<FlexBox>
										<MenuItem
											sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
											onClick={logoutHandler}
										>
											<ListItemIcon>
												<Logout sx={{ marginRight: '8px', fontSize: '20px' }} />
											</ListItemIcon>
											<Typography
												variant='h3'
												sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
											>
												Logout
											</Typography>
										</MenuItem>
									</FlexBox>
								</Stack>
							</MenuList>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* <IconButton
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
			</IconButton> */}

			{/* <Menu
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
				<Link to='/orderhistory' style={{ textDecoration: 'none' }}>
					<MenuItem
						sx={{ justifyContent: 'space-between' }}
						onClick={handleClose}
					>
						<ListItemIcon>
							<ManageSearchOutlined sx={{ marginRight: '8px' }} /> Order History
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
			</Menu> */}
		</>
	);
};

export default MenuLink;
