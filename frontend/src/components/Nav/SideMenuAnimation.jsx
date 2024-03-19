import React, { useRef, useState } from 'react';
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
} from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
	CloseOutlined,
	FavoriteBorderOutlined,
	Logout,
	ManageSearchOutlined,
	PersonOutline,
	ProductionQuantityLimitsOutlined,
	ManageAccountsOutlined,
	ListAltOutlined,
	PostAddOutlined,
} from '@mui/icons-material';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import UseDimensions from './UseDimensions';

const SideMenuAnimation = ({ style, width, height }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);
	const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

	const FlexBox = styled(Box)`
		display: flex;
		justify-content: space-between;
		align-items: center;
	`;

	// SideMene Toggle
	const [open, setOpen] = useState(false);
	const containerRef = useRef(null);
	const { height: dimensionsHeight } = UseDimensions(containerRef);

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

	const sidebarVariants = {
		open: (height = 1000) => ({
			clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
			transition: {
				type: 'spring',
				stiffness: 20,
				restDelta: 2,
				duration: 0.5,
			},
			zIndex: 10,
		}),
		closed: {
			clipPath: 'circle(10px at 48px -15px)',
			transition: {
				delay: 0.5,
				type: 'spring',
				stiffness: 400,
				damping: 40,
			},
		},
	};

	const linksVariants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};

	const itemVariants = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
		closed: {
			y: 100,
			opacity: 0,
			transition: {
				y: { stiffness: 1000 },
			},
		},
	};

	return (
		<>
			<Avatar
				src={userInfo.picturePath}
				alt={fullName}
				sx={{
					width: { width },
					height: { height },
					p: 0,
					cursor: 'pointer',
				}}
				style={style}
				onClick={() => setOpen(!open)}
			/>
			{/* Overlay */}
			<Box
				display={open ? 'block' : 'none'}
				backgroundColor='rgba(0,0,0,0.4)'
				position='fixed'
				zIndex={10}
				width='100%'
				height='100%'
				left='0'
				top='0'
				overflow='auto'
				// add or delete
				onClick={() => setOpen(!open)}
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
					<Box position='relative' width='100%' height='100%'>
						<Box
							position='absolute'
							width='100%'
							height='100%'
							display='flex'
							overflow='auto'
							flexDirection='column'
							justifyContent='center'
							alignItems='center'
						>
							{/* Icon Profile */}
							<IconButton
								onClick={() => setOpen(!open)}
								component={motion.button}
								sx={{
									position: 'absolute',
									display: 'flex',
									justifyContent: 'center',
									top: {
										xs: userInfo.isAdmin ? '40px' : '80px',
										sm: userInfo.isAdmin ? '80px' : '120px',
										md: userInfo.isAdmin ? '40px' : '100px',
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
							<Box display='flex' justifyContent='center' alignItems='center'>
								<MenuList>
									<Stack
										spacing={{ xs: 1, sm: 2.5 }}
										component={motion.div}
										variants={linksVariants}
									>
										<FlexBox
											component={motion.div}
											variants={itemVariants}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.7 }}
										>
											<Link
												to='/profile'
												style={{ textDecoration: 'none' }}
												onClick={() => setOpen(!open)}
											>
												<MenuItem style={{ alignItems: 'center' }}>
													<ListItemIcon>
														<PersonOutline
															sx={{ marginRight: '8px', fontSize: '20px' }}
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
										<FlexBox
											component={motion.div}
											variants={itemVariants}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.7 }}
										>
											<Link
												to='/orderhistory'
												style={{ textDecoration: 'none' }}
												onClick={() => setOpen(!open)}
											>
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
										<FlexBox
											component={motion.div}
											variants={itemVariants}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.7 }}
										>
											<Link
												to='/notpaidorders'
												style={{ textDecoration: 'none' }}
												onClick={() => setOpen(!open)}
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
										<FlexBox
											component={motion.div}
											variants={itemVariants}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.7 }}
										>
											<Link
												to='/wishlist'
												style={{ textDecoration: 'none' }}
												onClick={() => setOpen(!open)}
											>
												<MenuItem
													sx={{ display: 'flex', alignItems: 'center' }}
												>
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

										{/* Admin Menu */}
										{userInfo && userInfo.isAdmin && (
											<Box>
												<Divider sx={{ mb: '10px' }} />

												<Stack
													spacing={2.5}
													component={motion.div}
													variants={linksVariants}
												>
													<FlexBox
														component={motion.div}
														variants={itemVariants}
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.7 }}
													>
														<Link
															to='/admin/userslist'
															style={{ textDecoration: 'none' }}
															onClick={() => setOpen(!open)}
														>
															<MenuItem style={{ alignItems: 'center' }}>
																<ListItemIcon>
																	<ManageAccountsOutlined
																		sx={{
																			marginRight: '8px',
																			fontSize: '20px',
																		}}
																	/>
																</ListItemIcon>
																<Typography
																	variant='h3'
																	sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
																>
																	Users
																</Typography>
															</MenuItem>
														</Link>
													</FlexBox>
													<FlexBox
														component={motion.div}
														variants={itemVariants}
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.7 }}
													>
														<Link
															to='/admin/orderlist'
															style={{ textDecoration: 'none' }}
															onClick={() => setOpen(!open)}
														>
															<MenuItem style={{ alignItems: 'center' }}>
																<ListItemIcon>
																	<ListAltOutlined
																		sx={{
																			marginRight: '8px',
																			fontSize: '20px',
																		}}
																	/>
																</ListItemIcon>
																<Typography
																	variant='h3'
																	sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
																>
																	Orders
																</Typography>
															</MenuItem>
														</Link>
													</FlexBox>
													<FlexBox
														component={motion.div}
														variants={itemVariants}
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.7 }}
													>
														<Link
															to='/admin/itemslist'
															style={{ textDecoration: 'none' }}
															onClick={() => setOpen(!open)}
														>
															<MenuItem style={{ alignItems: 'center' }}>
																<ListItemIcon>
																	<PostAddOutlined
																		sx={{
																			marginRight: '8px',
																			fontSize: '20px',
																		}}
																	/>
																</ListItemIcon>
																<Typography
																	variant='h3'
																	sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
																>
																	Items
																</Typography>
															</MenuItem>
														</Link>
													</FlexBox>
												</Stack>
											</Box>
										)}

										<Divider />
										<FlexBox
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
												<ListItemIcon>
													<Logout
														sx={{ marginRight: '8px', fontSize: '20px' }}
													/>
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

							<Box
								position='absolute'
								// bottom='100px'
								left='50%'
								m='0 auto'
								sx={{
									bottom: {
										xs: userInfo.isAdmin ? '80px' : '100px',
										sm: userInfo.isAdmin ? '90px' : '140px',
									},
								}}
								style={{ transform: 'translateX(-50%)' }}
							>
								<IconButton onClick={() => setOpen(!open)}>
									<CloseOutlined />
								</IconButton>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default SideMenuAnimation;
