import React from 'react';
import {
	Badge,
	Box,
	IconButton,
	useMediaQuery,
	AppBar,
	Toolbar,
	Avatar,
	Tooltip,
} from '@mui/material';
import {
	PersonOutline,
	ShoppingBagOutlined,
	HomeOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { shades } from '../../theme';
import { useSelector } from 'react-redux';
import storeLogo from '../../assets/logo/athleisureLogoMini.png';
import { styled } from '@mui/material/styles';
import Footer from '../Footer';
import SearchInput from './SearchInput';
import SideMenuAnimation from './SideMenuAnimation';

const Navbar = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.auth);

	// SHopping length Badge
	const badgeContent = cartItems.reduce(
		(acc, currentItem) => acc + currentItem.quantity,
		0
	);

	const StyledBadge = styled(Badge)(() => ({
		'& .MuiBadge-badge': {
			right: -5,
			top: 1,
			padding: '0 4px',
			color: 'white',
			fontWeight: 'bold',
		},
	}));

	// bottom of center avatar icon
	const avatarStyle = {
		position: 'absolute',
		// zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto',
		boxShadow: 'none',
	};

	return (
		<Box
			display='flex'
			alignItems='center'
			width='100%'
			height='90px'
			backgroundColor={shades.babyBlue[500]}
			color={shades.primary[300]}
			position='fixed'
			top='0'
			left='0'
			zIndex='10'
		>
			{/* Over mobile screen */}
			{isNonMobile ? (
				<Box
					width='80%'
					margin='auto'
					display='flex'
					justifyContent='space-between'
					alignItems='center'
				>
					<Box
						sx={{
							'&:hover': { cursor: 'pointer' },
						}}
					>
						<Link to='/'>
							<img src={storeLogo} alt='storeLogo' />
						</Link>
					</Box>

					{/* Icons */}
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						columnGap='20px'
						zIndex='2'
					>
						{/* search function at TextField */}
						{/* When not logged in, not showing search display */}
						{userInfo && (
							<>
								<SearchInput label='Search Keyword or Category' />
							</>
						)}

						<Link to='/'>
							<IconButton>
								<HomeOutlined />
							</IconButton>
						</Link>

						<Link to='/cart'>
							{cartItems.length > 0 ? (
								<IconButton aria-label='cart'>
									<StyledBadge badgeContent={badgeContent} color='green'>
										<ShoppingBagOutlined />
									</StyledBadge>
								</IconButton>
							) : (
								<IconButton>
									<ShoppingBagOutlined />
								</IconButton>
							)}
						</Link>

						<Box display='flex' alignItems='center'>
							<Box sx={{ flexGrow: 0 }}>
								{/* When logged in show Menu */}
								{userInfo ? (
									<>
										<SideMenuAnimation />
									</>
								) : (
									<Link to='/login'>
										<Tooltip title='Login'>
											<IconButton>
												<Avatar sx={{ bgcolor: shades.blue[500] }}>
													<PersonOutline />
												</Avatar>
											</IconButton>
										</Tooltip>
									</Link>
								)}
							</Box>
						</Box>
					</Box>
					<Footer />
				</Box>
			) : (
				<>
					{/*  Mobile ver. Top NavBar */}
					<Box
						width='100%'
						margin='0 8px'
						pl='10px'
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Box
							sx={{
								'&:hover': { cursor: 'pointer' },
							}}
						>
							<Link to='/'>
								<img src={storeLogo} alt='storeLogo' />
							</Link>
						</Box>

						{userInfo && (
							<>
								<SearchInput label='Search' mr='30px' />
							</>
						)}
					</Box>

					{/*  Mobile ver. Bottom Footer */}
					<AppBar
						position='fixed'
						color='babyBlue'
						sx={{ top: 'auto', bottom: 0 }}
					>
						<Toolbar>
							<Link to='/'>
								<IconButton aria-label='home'>
									<HomeOutlined fontSize='large' sx={{ color: 'white' }} />
								</IconButton>
							</Link>

							{/* Mobile ver. logged in logic */}
							{userInfo ? (
								<>
									<SideMenuAnimation
										style={avatarStyle}
										width={60}
										height={60}
									/>
								</>
							) : (
								<Link to='/login'>
									<Tooltip title='Login'>
										<Avatar
											style={avatarStyle}
											sx={{
												bgcolor: shades.blue[500],
												width: 56,
												height: 56,
											}}
										>
											<PersonOutline fontSize='large' />
										</Avatar>
									</Tooltip>
								</Link>
							)}

							<Box sx={{ flexGrow: 1 }} />
							<Link to='/cart'>
								{cartItems.length > 0 ? (
									<IconButton aria-label='cart'>
										<StyledBadge badgeContent={badgeContent} color='green'>
											<ShoppingBagOutlined
												fontSize='large'
												sx={{ color: 'white' }}
											/>
										</StyledBadge>
									</IconButton>
								) : (
									<ShoppingBagOutlined
										fontSize='large'
										sx={{ color: 'white' }}
									/>
								)}
							</Link>
						</Toolbar>
					</AppBar>
				</>
			)}
		</Box>
	);
};

export default Navbar;
