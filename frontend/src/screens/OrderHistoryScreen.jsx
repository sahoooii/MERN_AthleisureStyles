import React from 'react';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Utils/Loader';
import Message from '../components/Utils/Message';
import { shades } from '../theme';
import ButtonComponent from '../components/Utils/ButtonComponent';
import { ArrowForwardIosOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const OrderHistoryScreen = () => {
	const isNonMobileScreen = useMediaQuery('(min-width:600px)');

	const { data: orders, isLoading, error } = useGetMyOrdersQuery();
	// console.log(orders);
	return (
		<Box
			sx={{
				m: { md: '30px auto', xs: '10px auto' },
				width: { xs: '95%', sm: '90%' },
			}}
		>
			<Box mb='100px'>
				<Typography variant='h3' sx={{ mb: '20px' }}>
					My <b>Orders</b>
				</Typography>
				{isLoading ? (
					<Loader />
				) : error ? (
					<Message severity='error'>
						{error?.data?.message || error.error}
					</Message>
				) : (
					<>
						{orders.length === 0 ? (
							<Message severity='error'>
								Oh No! You haven't shopping yet!
								<Link to='/'>- Go Back</Link>
							</Message>
						) : isNonMobileScreen ? (
							<>
								{orders.map((order) => (
									<Box key={order._id}>
										{order.isPaid && (
											<Box
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
																<Typography variant='h4'>
																	${order.totalPrice}
																</Typography>
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
																<Typography variant='h4'>
																	{order._id}
																</Typography>
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
													<Grid container alignItems='center'>
														<Grid
															item
															sm={12}
															sx={{
																display: 'flex',
																justifyContent: 'space-between',
																alignItems: 'center',
															}}
															columnSpacing={2}
														>
															<Grid item sm={5} sx={{ mb: '12px' }}>
																{/* {order.isPaid && ( */}
																<Message severity='info'>
																	{/* Replace */}
																	PAID AT {order.paidAt.substring(0, 10)}
																</Message>
																{/* )} */}
															</Grid>
															<Grid item sm={5} sx={{ mb: '12px' }}>
																{orders.isDelivered && (
																	<Message severity='success'>
																		{/* Replace */}
																		DELIVERED AT{' '}
																		{order.deliveredAt.substring(0, 10)}
																	</Message>
																)}
															</Grid>
														</Grid>

														{order.orderItems.map((item) => (
															<Grid
																item
																sm={8}
																key={item._id}
																sx={{
																	display: 'flex',
																	alignItems: 'center',
																	mb: '5px',
																}}
															>
																<Grid item sm={4}>
																	<img
																		src={item.image}
																		alt={item.name}
																		width='100px'
																		height='120px'
																		style={{
																			borderRadius: '3px',
																		}}
																	/>
																</Grid>
																<Grid item sm={8}>
																	<Link
																		to={`/item/${item.item}`}
																		style={{ textDecoration: 'underline' }}
																	>
																		<Typography
																			variant='h3'
																			fontWeight='bold'
																			color='secondary'
																			sx={{ cursor: 'pointer' }}
																		>
																			{item.name}
																		</Typography>
																	</Link>
																</Grid>
															</Grid>
														))}

														<Grid item sm={4} sx={{ alignItems: 'center' }}>
															<Stack spacing={3}>
																<Box
																	display='flex'
																	alignItems='center'
																	justifyContent='flex-end'
																>
																	<Box sx={{ width: { sm: '80%', md: '60%' } }}>
																		<Link to={`/order/${order._id}`}>
																			<ButtonComponent
																				backgroundColor={shades.neutral[600]}
																			>
																				<Typography
																					variant='h4'
																					sx={{ mr: '8px' }}
																				>
																					DETAILS
																				</Typography>
																				<ArrowForwardIosOutlined />
																			</ButtonComponent>
																		</Link>
																	</Box>
																</Box>
															</Stack>
														</Grid>
													</Grid>
												</Box>
											</Box>
										)}
									</Box>
								))}
							</>
						) : (
							// Mobile ver.
							<>
								{orders.map((order) => (
									<Box key={order._id}>
										{order.isPaid && (
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
													key={order._id}
												>
													{/* Details */}
													<Grid container alignItems='center'>
														<Grid item xs={12}>
															<Grid item xs={12} sx={{ mb: '12px' }}>
																{/* {order.isPaid && ( */}
																<Message severity='info'>
																	{/* Replace */}
																	PAID AT {order.paidAt.substring(0, 10)}
																</Message>
																{/* )} */}
															</Grid>
															<Grid item xs={12} sx={{ mb: '12px' }}>
																{orders.isDelivered && (
																	<Message severity='success'>
																		{/* Replace */}
																		DELIVERED AT
																		{order.deliveredAt.substring(0, 10)}
																	</Message>
																)}
															</Grid>
														</Grid>

														{order.orderItems.map((item) => (
															<Grid
																item
																xs={11}
																key={item._id}
																columnSpacing={2}
																sx={{
																	display: 'flex',
																	alignItems: 'center',
																	mb: '5px',
																}}
															>
																<Grid item xs={5}>
																	<img
																		src={item.image}
																		alt={item.name}
																		width='80px'
																		height='100px'
																		style={{
																			borderRadius: '3px',
																		}}
																	/>
																</Grid>
																<Grid item xs={6}>
																	<Link
																		to={`/item/${item.item}`}
																		style={{ textDecoration: 'underline' }}
																	>
																		<Typography
																			variant='h4'
																			fontWeight='bold'
																			color='secondary'
																			sx={{ cursor: 'pointer' }}
																		>
																			{item.name}
																		</Typography>
																	</Link>
																</Grid>
															</Grid>
														))}
														<Grid
															item
															xs={1}
															display='flex'
															alignItems='center'
															justifyContent='flex-end'
														>
															<Link
																to={`/order/${order._id}`}
																sx={{ cursor: 'pointer' }}
															>
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
								))}
							</>
						)}
					</>
				)}
			</Box>
		</Box>
	);
};

export default OrderHistoryScreen;
