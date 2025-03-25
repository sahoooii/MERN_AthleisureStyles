import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	ListItemIcon,
	MenuItem,
	MenuList,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined, Logout } from '@mui/icons-material';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import UseDimensions from './UseDimensions';
import SideMenu from './SideMenu';
import AdminSideMenu from './AdminSideMenu';
import { useTheme } from '@emotion/react';

const SideMenuAnimation = ({ style, width, height }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // モバイル判定

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);
	const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

	// SideMene Toggle
	const [open, setOpen] = useState(false);

	const containerRef = useRef(null);
	const { height: dimensionsHeight } = UseDimensions(containerRef);

	const [logoutApiCall] = useLogoutMutation();

	const toggleDrawer = (state) => () => {
		setOpen(state);
	};

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

	const sidebarVariants = useMemo(() => {
		if (isMobile) {
			return {
				open: {
					y: 0,
					opacity: 1,
					transition: {
						type: 'spring',
						stiffness: 120,
						damping: 15,
					},
					zIndex: 10,
				},
				closed: {
					y: '100%',
					opacity: 0,
					transition: {
						type: 'spring',
						stiffness: 180,
						damping: 30,
						staggerChildren: 0.15,
						staggerDirection: -1,
						delayChildren: 0.08,
					},
				},
			};
		} else {
			return {
				open: (height = 1000) => ({
					clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
					transition: { type: 'spring', stiffness: 100, damping: 15 },
					zIndex: 10,
				}),
				closed: {
					clipPath: 'circle(10px at 300px -15px)',
					transition: {
						delay: 0.3,
						type: 'spring',
						stiffness: 400,
						damping: 50,
					},
				},
			};
		}
	}, [isMobile]);

	const linksVariants = useMemo(() => {
		if (isMobile) {
			return {
				open: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } }, // 開くのを少し早く
				closed: {
					transition: {
						staggerChildren: 0.15,
						staggerDirection: -1,
						delayChildren: 0.08,
					},
				},
			};
		} else {
			return {
				open: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
				closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
			};
		}
	}, [isMobile]);

	const itemVariants = useMemo(() => {
		if (isMobile) {
			return {
				open: {
					y: 0,
					opacity: 1,
					transition: { type: 'spring', stiffness: 130 },
				},
				closed: {
					y: 50,
					opacity: 0,
					transition: {
						type: 'spring',
						stiffness: 120,
						damping: 25,
					},
				},
			};
		} else {
			return {
				open: { y: 0, opacity: 1 },
				closed: { y: 100, opacity: 0, transition: { y: { stiffness: 1000 } } },
			};
		}
	}, [isMobile]);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [open]);

	return (
		<>
			<Avatar
				src={userInfo.picturePath}
				alt={fullName}
				sx={{
					width: { width },
					height: { height },
					// p: 0,
					cursor: 'pointer',
				}}
				style={style}
				onClick={toggleDrawer(true)}
			/>
			{/* Overlay */}
			<Box
				display={open ? 'block' : 'none'}
				backgroundColor='rgba(0,0,0,0.4)'
				position='fixed'
				zIndex={10}
				width='100%'
				height='100%'
				// maxHeight={open ? '500px' : '100%'}
				left='0'
				top='0'
				overflow='auto'
			/>
			{/* sideBar */}
			<Box
				component={motion.div}
				animate={open ? 'open' : 'closed'}
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				custom={dimensionsHeight}
				ref={containerRef}
			>
				{/* bg */}
				<Box
					component={motion.div}
					position='fixed'
					top='0'
					right='0'
					bottom='0'
					backgroundColor='white'
					zIndex='10'
					sx={{ width: { xs: 0.7, sm: 'max(350px, 25%)' } }}
					variants={sidebarVariants}
				>
					<Box
						position='relative'
						width='100%'
						height='100%'
						sx={{ overflow: 'hidden' }}
					>
						<Box
							position='absolute'
							width='100%'
							height='100%'
							display='flex'
							overflow='auto'
							flexDirection='column'
							justifyContent='center'
							alignItems='center'
							onClick={() => setOpen(!open)}
						>
							{/* Icon Profile */}
							<IconButton
								onClick={() => setOpen(!open)}
								component={motion.button}
								variants={sidebarVariants}
								sx={{
									position: 'absolute',
									display: 'flex',
									justifyContent: 'center',
									top: {
										xs: userInfo.isAdmin ? '50px' : '90px',
										sm: userInfo.isAdmin ? '75px' : '85px',
										md: userInfo.isAdmin ? '40px' : '75px',
									},
								}}
							>
								<Avatar
									src={userInfo.picturePath}
									alt={fullName}
									sx={{
										width: 80,
										height: 80,
									}}
								/>
							</IconButton>

							{/* Menu Links */}
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								sx={{
									maxHeight: 'calc(100vh - 60px)',
									overflowY: 'hidden',
									overflowX: 'hidden',
								}}
							>
								<MenuList component={motion.ul} variants={linksVariants}>
									<Stack
										spacing={{ xs: userInfo.isAdmin ? 1.5 : 2, sm: 2.5 }}
										sx={{
											mt: {
												xs: userInfo.isAdmin ? '155px' : '130px',
												sm: userInfo.isAdmin ? '55px' : '60px',
												md: userInfo.isAdmin ? '120px' : '100px',
											},
										}}
									>
										{/* Regular Menu */}
										{SideMenu.map((menu) => (
											<Box
												key={menu.title ? menu.title : `${fullName}`}
												component={motion.div}
												variants={itemVariants}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.7 }}
											>
												<Link
													to={menu.link}
													style={{ textDecoration: 'none' }}
													onClick={() => setOpen(!open)}
												>
													<MenuItem
														component={motion.li}
														variants={itemVariants}
													>
														<ListItemIcon sx={{ pr: '20px' }}>
															{menu.icon}
														</ListItemIcon>
														{menu.link === '/profile' ? (
															<Typography
																variant='h3'
																sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
															>
																{fullName}
															</Typography>
														) : (
															<Typography
																variant='h3'
																sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
															>
																{menu.title}
															</Typography>
														)}
													</MenuItem>
												</Link>
											</Box>
										))}

										{/* Admin Menu */}
										{userInfo && userInfo.isAdmin && (
											<Box
												// sx={{
												// 	maxHeight: 'calc(100vh - 60px)',
												// 	overflowY: 'hidden',
												// }}
											>
												<Divider
													sx={{ mb: '10px' }}
													component={motion.hr}
													variants={itemVariants}
												/>
												<Stack spacing={2.5}>
													{AdminSideMenu.map((adminMenu) => (
														<Box
															key={adminMenu.title}
															component={motion.div}
															variants={itemVariants}
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.7 }}
														>
															<Link
																to={adminMenu.link}
																style={{ textDecoration: 'none' }}
																onClick={() => setOpen(!open)}
															>
																<MenuItem style={{ alignItems: 'center' }}>
																	<ListItemIcon sx={{ pr: '20px' }}>
																		{adminMenu.icon}
																	</ListItemIcon>
																	<Typography
																		variant='h3'
																		sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
																	>
																		{adminMenu.title}
																	</Typography>
																</MenuItem>
															</Link>
														</Box>
													))}
												</Stack>
											</Box>
										)}

										{/* Logout */}
										<Divider component={motion.hr} variants={itemVariants} />
										<Box
											component={motion.div}
											variants={itemVariants}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.7 }}
										>
											<MenuItem
												sx={{
													display: 'flex',
													alignItems: 'center',
													mt: 0.5,
												}}
												onClick={logoutHandler}
											>
												<ListItemIcon sx={{ pr: '20px' }}>
													<Logout sx={{ fontSize: '30px' }} />
												</ListItemIcon>
												<Typography
													variant='h3'
													sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
												>
													Logout
												</Typography>
											</MenuItem>
										</Box>
									</Stack>
									<Box
										display='flex'
										alignItems='center'
										justifyContent='center'
										sx={{ mt: userInfo.isAdmin ? '10px' : '80px' }}
										style={{ transform: 'translateX(-50%)' }}
										component={motion.div}
										variants={itemVariants}
									>
										<IconButton onClick={() => setOpen(!open)}>
											<CloseOutlined />
										</IconButton>
									</Box>
								</MenuList>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default SideMenuAnimation;
