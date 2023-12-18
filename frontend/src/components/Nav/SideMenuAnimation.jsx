import React, { useState } from 'react';
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
} from '@mui/icons-material';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';

const SideMenuAnimation = ({ style, width, height }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);

	const isNonMobile = useMediaQuery('(min-width:600px)');

	const { userInfo } = useSelector((state) => state.auth);

	const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

	const FlexBox = styled(Box)`
		display: flex;
		justify-content: space-between;
		align-items: center;
	`;

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

	const variants = {
		open: {
			clipPath: 'circle(1200px at  48px -15px)',
			transition: {
				type: 'spring',
				stiffness: 20,
			},
			zIndex: 10,
		},
		closed: {
			clipPath: 'circle(10px at 48px -15px)',
			transition: {
				delay: 0.1,
				type: 'spring',
				stiffness: 400,
				damping: 40,
			},
		},
	};

	const linksVariants = {
		open: {
			transition: {
				staggerChildren: 0.1,
			},
		},
		closed: {
			transition: {
				staggerChildren: 0.05,
				staggerDirection: -1,
			},
		},
	};

	const itemVariants = {
		open: {
			y: 0,
			opacity: 1,
		},
		closed: {
			y: 200,
			opacity: 0,
		},
	};

	return (
		<>
			<IconButton
				onClick={() => setOpen(!open)}
				sx={{
					p: 0,
					// zIndex: 30,
				}}
				style={style}
			>
				<Avatar
					src={userInfo.picturePath}
					alt={fullName}
					sx={{
						width: { width },
						height: { height },
					}}
				/>
			</IconButton>

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
			/>
			{/* sideBar */}
			<Box
				component={motion.div}
				animate={open ? 'open' : 'closed'}
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
			>
				{/* bg */}
				<Box
					component={motion.div}
					position='fixed'
					top='0'
					right='0'
					bottom='0'
					backgroundColor='white'
					sx={{ width: { xs: 1, sm: 'max(350px, 25%)' } }}
					variants={variants}
				>
					{/* Links */}
					<Box
						position='relative'
						width='100%'
						height='100%'
						// border='dashed red'
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
							// border='dashed blue'
						>
							{/* Icon Profile */}
							<IconButton
								onClick={() => setOpen(!open)}
								component={motion.button}
								sx={{
									position: 'absolute',
									top: '100px',
									display: 'flex',
									justifyContent: 'center',
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

							{/* Menu */}
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								component={motion.div}
								variants={linksVariants}
							>
								<MenuList>
									{/* ここで動くか？ */}
									<Stack
										spacing={3}
										component={motion.div}
										variants={itemVariants}
									>
										<FlexBox
											component={motion.div}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
										>
											<Link
												to='/myprofile'
												style={{ textDecoration: 'none' }}
												// component={motion.a}
												// variants={linksVariants}
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
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
										>
											<Link
												to='/orderhistory'
												style={{ textDecoration: 'none' }}
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
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
										>
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
										<FlexBox
											component={motion.div}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
										>
											<Link to='/wishlist' style={{ textDecoration: 'none' }}>
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

										<Divider />
										<FlexBox
											component={motion.div}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.95 }}
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

							{/* <Box display={isNonMobile ? 'block' : 'none'}> */}
							<Box
								position='absolute'
								bottom='100px'
								left='50%'
								m='0 auto'
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
