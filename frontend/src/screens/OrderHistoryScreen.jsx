import React from 'react';
import {
	Box,
	Grid,
	Link,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Utils/Loader';
import Message from '../components/Utils/Message';
import { shades } from '../theme';
import ButtonComponent from '../components/Utils/ButtonComponent';
import styled from '@emotion/styled';
import { ArrowForwardIosOutlined, CreateOutlined } from '@mui/icons-material';

const OrderHistoryScreen = () => {
	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const { data: orders, isLoading, error } = useGetMyOrdersQuery();
	// console.log(orders);
	return (
		<Box
			sx={{
				m: { md: '50px auto', xs: '10px auto' },
				width: { xs: '95%', sm: '90%' },
			}}
		>
			<Typography variant='h3' sx={{ mb: '20px' }}>
				My <b>Orders</b>
			</Typography>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : isNonMobileScreen ? (
				<>
					{orders.map((order) => (
						<Box
							key={order._id}
							sx={{
								alignItems: 'center',
								border: `1px ${shades.neutral[500]} solid`,
								borderRadius: 1,
								m: '15px 0',
							}}
						>
							<Box
								backgroundColor={shades.blue[400]}
								p='10px 30px'
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								<Grid container alignItems='center' columnSpacing={2}>
									{/* Header */}
									<Grid item sm={3}>
										<Stack spacing={1.5} sx={{ color: 'white' }}>
											<Typography variant='h3'>ORDER DATE</Typography>
											<Typography variant='h4'>
												{order.createdAt.substring(0, 10)}
											</Typography>
										</Stack>
									</Grid>
									<Grid item sm={3}>
										<Stack spacing={1.5} sx={{ color: 'white' }}>
											<Typography variant='h3'>$TOTAL</Typography>
											<Typography variant='h4'>${order.totalPrice}</Typography>
										</Stack>
									</Grid>
									<Grid item sm={2} />
									<Grid
										item
										sm={4}
										sx={{
											color: 'white',
											alignItems: 'center',
										}}
									>
										<Stack spacing={1.5}>
											<Typography variant='h3'>ORDER NO.</Typography>
											<Typography variant='h4'>{order._id}</Typography>
										</Stack>
									</Grid>
								</Grid>
							</Box>

							<Box
								p='15px 30px'
								display='flex'
								alignItems='center'
								justifyContent='center'
							>
								{/* Details */}
								{/* 1以上の時だけcolumnにする */}
								<Grid
									container
									alignItems='center'
									columnSpacing={2}
									sx={{ display: 'flex', flexDirection: 'column' }}
								>
									{order.orderItems.map((item) => (
										<Box key={item._id}>
											{order.orderItems.length > 1 ? (
												<Box>
													<Grid
														item
														sm={3}
														// not work
														// sx={{ display: 'flex', flexDirection: 'column' }}
													>
														<img
															src={item.image}
															alt={item.name}
															width='95px'
															height='120px'
															style={{
																borderRadius: '3px',
															}}
														/>
													</Grid>
												</Box>
											) : (
												<Box key={item._id}>
													<Grid item sm={3}>
														<img
															src={item.image}
															alt={item.name}
															width='95px'
															height='120px'
															style={{
																borderRadius: '3px',
															}}
														/>
													</Grid>
												</Box>
											)}
										</Box>
									))}
								</Grid>

								<Grid container alignItems='center' columnSpacing={2}>
									<Grid item sm={5}>
										<Stack spacing={1}>
											<Typography variant='h4'>
												DELIVERED AT 2023/12/25
											</Typography>
											<Link to='/'>
												<Typography
													variant='h3'
													fontWeight='bold'
													color='secondary'
													sx={{ cursor: 'pointer' }}
												>
													Item Name
												</Typography>
											</Link>
										</Stack>
									</Grid>

									<Grid item sm={3}>
										<Stack spacing={3}>
											<Box
												display='flex'
												alignItems='center'
												justifyContent='flex-end'
											>
												<Box sx={{ width: { sm: '80%', md: '60%' } }}>
													<ButtonComponent
														backgroundColor={shades.neutral[600]}
													>
														<Typography variant='h4' sx={{ mr: '8px' }}>
															DETAILS
														</Typography>
														<ArrowForwardIosOutlined />
													</ButtonComponent>
												</Box>
											</Box>
											<Box
												display='flex'
												alignItems='center'
												justifyContent='flex-end'
											>
												<Box sx={{ width: { sm: '80%', md: '60%' } }}>
													<ButtonComponent
														backgroundColor={shades.babyPink[600]}
													>
														<Typography variant='h4' sx={{ mr: '8px' }}>
															REVIEW
														</Typography>
														<CreateOutlined />
													</ButtonComponent>
												</Box>
											</Box>
										</Stack>
									</Grid>
								</Grid>
							</Box>
						</Box>
					))}
				</>
			) : (
				// Mobile ver.
				<Box
					sx={{
						alignItems: 'center',
						border: `1px ${shades.neutral[500]} solid`,
						borderRadius: 1,
						m: '15px 0',
					}}
				>
					<Box
						p='15px 12px'
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						{/* Details */}
						<Grid container alignItems='center' columnSpacing={2}>
							<Grid item xs={4}>
								<img
									src='/images/profilePics/shohei.jpg'
									alt='shohei'
									width='80px'
									height='100px'
									style={{
										borderRadius: '3px',
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<Stack spacing={1}>
									<Typography variant='h4'>DELIVERED AT 2023/12/25</Typography>
									<Link to='/'>
										<Typography
											variant='h3'
											fontWeight='bold'
											color='secondary'
											sx={{ cursor: 'pointer' }}
										>
											Item Name
										</Typography>
									</Link>
								</Stack>
							</Grid>
							<Grid
								item
								xs={2}
								display='flex'
								alignItems='center'
								justifyContent='flex-end'
							>
								<Link to='/' sx={{ cursor: 'pointer' }}>
									<ArrowForwardIosOutlined
										sx={{ color: shades.neutral[700] }}
									/>
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default OrderHistoryScreen;
