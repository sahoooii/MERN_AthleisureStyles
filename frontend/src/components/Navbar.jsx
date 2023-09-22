import React, { useRef, useState } from 'react';
import {
	Badge,
	Box,
	IconButton,
	TextField,
	InputAdornment,
	useMediaQuery,
	AppBar,
	Toolbar,
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
} from '@mui/material';
import {
	PersonOutline,
	ShoppingBagOutlined,
	SearchOutlined,
	Login,
	Logout,
	EditOutlined,
	LocalFireDepartmentOutlined,
	EditNoteOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../theme';
import storeLogo from '../assets/logo/athleisureLogoMini.png';
import shokota from '../assets/shokota.JPG';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Divider from '@mui/material/Divider';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const anchorEl = useRef(null);
	// Menu toggle
	const handleClick = () => {
		setOpen(!open);
	};

	// Menu Close
	const handleClose = () => {
		setOpen(false);
	};

	// const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');
	// bottom of center icon
	const StyledFab = styled(Fab)({
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto',
	});

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
			zIndex='1'
		>
			{isNonMobile ? (
				<Box
					width='80%'
					margin='auto'
					display='flex'
					justifyContent='space-between'
					alignItems='center'
				>
					<Box
						onClick={() => {}}
						sx={{
							'&:hover': { cursor: 'pointer' },
						}}
					>
						<img src={storeLogo} alt='storeLogo' />
					</Box>

					{/* Icons */}
					<Box
						display='flex'
						justifyContent='space-between'
						columnGap='20px'
						zIndex='2'
					>
						<TextField
							id='search'
							type='text'
							label='Search Keyword or Category'
							sx={{ width: 250, input: { cursor: 'pointer' } }}
							color='blue'
							InputProps={{
								style: {
									borderRadius: '10px',
								},
								endAdornment: (
									<InputAdornment position='end' sx={{ cursor: 'pointer' }}>
										<SearchOutlined />
									</InputAdornment>
								),
							}}
						/>
						<IconButton>
							<ShoppingBagOutlined />
						</IconButton>
						{/* </Link> */}
						{/* Link Login */}
						<IconButton>
							<Login />
							{/* <PersonOutline /> */}
						</IconButton>
					</Box>
				</Box>
			) : (
				<>
					<Box
						width='100%'
						margin='auto'
						display='flex'
						justifyContent='space-around'
						alignItems='center'
					>
						<Box
							onClick={() => {}}
							sx={{
								'&:hover': { cursor: 'pointer' },
							}}
						>
							<img src={storeLogo} alt='storeLogo' />
						</Box>

						<TextField
							id='search'
							type='search'
							label='Search'
							color='blue'
							sx={{
								width: '60%',
								input: { cursor: 'pointer' },
							}}
							InputProps={{
								style: {
									borderRadius: '10px',
								},
								endAdornment: (
									<InputAdornment position='end' sx={{ cursor: 'pointer' }}>
										<SearchOutlined />
									</InputAdornment>
								),
							}}
						/>
					</Box>

					{/* Bottom */}
					<AppBar
						position='fixed'
						color='babyBlue'
						sx={{ top: 'auto', bottom: 0 }}
					>
						<Toolbar>
							{/* On popular */}
							<IconButton aria-label='open drawer'>
								<LocalFireDepartmentOutlined
									fontSize='large'
									sx={{ color: 'white' }}
								/>
							</IconButton>

							{/* When Not Login */}
							{/* <PersonOutline fontSize='large' sx={{ color: 'white' }} /> */}
							{/* <StyledFab color='green' aria-label='add'> */}
							{/* </StyledFab> */}
							<Avatar
								ref={anchorEl}
								src={shokota}
								alt='shokota'
								sx={{
									width: '50px',
									height: '50px',
									position: 'absolute',
									zIndex: 1,
									top: -30,
									left: 0,
									right: 0,
									margin: '0 auto',
									'&:hover': { cursor: 'pointer' },
								}}
								onClick={handleClick}
							/>
							<Menu
								id='account-menu'
								anchorEl={anchorEl.current}
								open={open}
								onClose={handleClose}
								disableAutoFocusItem={false}
								paper={{
									elevation: 0,
									sx: {
										overflow: 'visible',
										filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
										mt: 1.5,
										'& .MuiAvatar-root': {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
										'&:before': {
											content: '""',
											display: 'block',
											position: 'absolute',
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: 'background.paper',
											transform: 'translateY(-50%) rotate(45deg)',
											zIndex: 0,
										},
									},
								}}
								transformOrigin={{ horizontal: 'right', vertical: 'top' }}
								anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
							>
								<MenuItem sx={{ justifyContent: 'space-around' }}>
									<PersonOutline /> See Profile
								</MenuItem>
								<MenuItem sx={{ justifyContent: 'space-around' }}>
									<EditNoteOutlined /> My account
								</MenuItem>

								<Divider />
								<MenuItem>
									<ListItemIcon sx={{ justifyContent: 'space-around' }}>
										<Logout fontSize='large' />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>

							<Box sx={{ flexGrow: 1 }} />
							<IconButton color='inherit'>
								<ShoppingBagOutlined fontSize='large' sx={{ color: 'white' }} />
							</IconButton>
						</Toolbar>
					</AppBar>

					{/* <IconButton>
								<MenuOutlined />
							</IconButton> */}
				</>
			)}
		</Box>
	);
};

export default Navbar;
