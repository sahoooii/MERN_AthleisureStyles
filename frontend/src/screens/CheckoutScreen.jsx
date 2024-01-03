import React, { useEffect } from 'react';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Divider,
	FormControl,
	Grid,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
	useDeleteMyOrderMutation,
} from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import Message from '../components/Utils/Message';
import Loader from '../components/Utils/Loader';
import ButtonComponent from '../components/Utils/ButtonComponent';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import { shades } from '../theme';

const CheckoutScreen = () => {
	const navigate = useNavigate();

	// Get order details
	const { id: orderId } = useParams();
	// const { userInfo } = useSelector((state) => state.auth);

	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId);

	// Delete order before pay or in order history without pay
	const [deleteMyOrder, { isLoading: loadingDelete }] =
		useDeleteMyOrderMutation();

	const deleteHandler = async (orderId) => {
		if (window.confirm('Are you sure delete your order?')) {
			try {
				await deleteMyOrder(orderId);

				navigate('/');
			} catch (err) {
				toast.error(err?.data?.message || err.message);
			}
		}
	};

	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

	const {
		data: paypal,
		isLoading: loadingPayPal,
		error: errorPayPal,
	} = useGetPayPalClientIdQuery();

	useEffect(() => {
		if (!errorPayPal && !loadingPayPal && paypal.clientId) {
			const loadPayPalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': paypal.clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({
					type: 'setLoadingStatus',
					value: 'pending',
				});
			};
			if (order && !order.isPaid) {
				// Not already loaded
				if (!window.paypal) {
					loadPayPalScript();
				}
			}
		}
	}, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

	// details come from PayPal, actions is trigger to PayPal
	function onApprove(data, actions) {
		return actions.order.capture().then(async function (details) {
			try {
				await payOrder({ orderId, details });
				// To mark paid
				refetch();

				toast.success('Payment Successful');
			} catch (err) {
				toast.error(err?.data?.message || err.message);
			}
		});
	}
	// For payment test
	// async function onApproveTest() {
	// 	await payOrder({ orderId, details: { payer: {} } });
	// 	refetch();
	// 	toast.success('Payment Successful');
	// }

	function onError(err) {
		toast.error(err.message);
	}

	function createOrder(data, actions) {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: order.totalPrice,
						},
					},
				],
			})
			.then((orderId) => {
				return orderId;
			});
	}

	return (
		<Box m='0 auto' sx={{ width: { xs: '90%', md: '90%' } }}>
			{isLoading ? (
				<Loader />
			) : loadingDelete ? (
				<Loader />
			) : error ? (
				<Message severity={error}>{error.data.message}</Message>
			) : (
				<>
					{!order.isPaid ? (
						<CheckoutSteps step={3} />
					) : (
						<CheckoutSteps step={4} />
					)}

					<Box
						sx={{
							flexGrow: 1,
							alignItems: 'center',
							mt: '30px',
							// mb: { sm: '20px' },
						}}
					>
						<Grid container mt='10px' spacing={3}>
							<Grid item md={8} xs={12}>
								<Box mb='25px'>
									{order.isPaid && (
										<Box
											display='flex'
											justifyContent='center'
											alignItems='center'
										>
											<Typography
												variant='h3'
												sx={{ color: '#529085', fontWeight: 'bold' }}
											>
												Thank you for shopping with us
											</Typography>
											<WavingHandOutlinedIcon
												sx={{ ml: '5px', color: '#6ec0b2' }}
											/>
										</Box>
									)}
								</Box>
								<Box>
									<Box mb='25px'>
										<Stack spacing={2}>
											<Typography variant='h3' fontWeight='bold'>
												Your Order
											</Typography>
											{order.isPaid && (
												<Message severity='success'>Order: {order._id}</Message>
											)}
										</Stack>
									</Box>

									{/* Information */}
									<Grid container m='14px 0'>
										<Grid item xs={12}>
											<Stack spacing={1}>
												<Typography variant='h3'>Shipping Address</Typography>
												<Typography variant='subtitle1'>
													<strong>Name:</strong>{' '}
													{order.shippingAddress.firstName}{' '}
													{order.shippingAddress.lastName}
												</Typography>
												<Typography variant='subtitle1'>
													<strong>Address:</strong>{' '}
													{order.shippingAddress.address},{' '}
													{order.shippingAddress.city},{' '}
													{order.shippingAddress.state},{' '}
													{order.shippingAddress.postalCode},{' '}
													{order.shippingAddress.country}
												</Typography>

												{order.isDelivered ? (
													<Message>Delivered on {order.deliveredAt}</Message>
												) : (
													<Message severity='error'>Not Delivered</Message>
												)}
											</Stack>
										</Grid>
									</Grid>

									<Divider />

									<Grid container m='14px 0'>
										<Grid item xs={12}>
											<Stack spacing={1}>
												<Typography variant='h3'>Billing Address</Typography>
												<Typography variant='subtitle1'>
													<strong>Name:</strong>{' '}
													{order.billingAddress.firstName}{' '}
													{order.billingAddress.lastName}
												</Typography>
												<Typography variant='subtitle1'>
													<strong>Address:</strong>{' '}
													{order.billingAddress.address},{' '}
													{order.billingAddress.city},{' '}
													{order.billingAddress.state},{' '}
													{order.billingAddress.postalCode},{' '}
													{order.billingAddress.country}
												</Typography>
											</Stack>
										</Grid>
									</Grid>

									<Divider />

									<Stack spacing={1} m='14px 0'>
										<Typography variant='h3'>Payment Method</Typography>
										<Typography variant='subtitle1'>
											<strong>Method:</strong> {order.paymentMethod}
										</Typography>

										{order.isPaid ? (
											<Message>Paid on {order.paidAt.substring(0, 10)}</Message>
										) : (
											<Message severity='error'>Not Paid</Message>
										)}
									</Stack>

									<Divider />

									<Box sx={{ mb: { md: '40px' } }}>
										<Typography variant='h3' sx={{ mt: '14px' }}>
											Order Items
										</Typography>
										{order.orderItems.map((item) => (
											<Box key={item._id}>
												<Grid container m='15px 0'>
													<Grid item sm={4} xs={5}>
														<img
															src={item.image}
															alt={item.name}
															width='90px'
															height='120px'
															style={{
																borderRadius: '3px',
															}}
														/>
													</Grid>
													<Grid item sm={7} xs={5}>
														<Stack spacing={2}>
															{/* <Link
															to={`/item/${item._id}`}
															style={{ textDecoration: 'underline' }}
														> */}
															<Typography
																sx={{ fontSize: { xs: '12px', sm: '16px' } }}
																fontWeight='bold'
																color='secondary'
															>
																{item.name}
															</Typography>
															{/* </Link> */}
															<Typography variant='h4' fontWeight='bold'>
																${item.price}
															</Typography>
															{/* Quantity */}
															<FormControl
																sx={{ m: 1, width: { sm: 120, xs: 100 } }}
															>
																<TextField
																	name='quantity'
																	color='neutral'
																	label='Quantity'
																	value={item.quantity}
																	InputProps={{
																		readOnly: true,
																	}}
																/>
															</FormControl>
														</Stack>
													</Grid>
												</Grid>
												<Divider />
											</Box>
										))}
									</Box>
								</Box>
							</Grid>

							<Grid
								item
								md={4}
								xs={12}
								sx={{
									mt: { xs: '25px', md: '35px' },
									mb: { xs: '20px' },
								}}
							>
								<Card>
									<CardContent>
										<Stack spacing={2}>
											<Typography variant='h3' fontWeight='bold'>
												Order Summary
											</Typography>
											<Typography variant='h3'>
												SubTotal: (
												{order.orderItems.reduce(
													(acc, item) => acc + item.quantity,
													0
												)}
												) Items
											</Typography>

											<Typography variant='h3'>
												Items: $
												{order.orderItems
													.reduce(
														(acc, item) => acc + item.quantity * item.price,
														0
													)
													.toFixed(2)}
											</Typography>
											<Stack spacing={0}>
												<Typography variant='subtitle1'>
													Tax: <span>${order.taxPrice}</span>
												</Typography>
												<Typography variant='subtitle1'>
													Shipping: <span>${order.shippingPrice}</span>
												</Typography>
											</Stack>
											<Divider />

											<Typography variant='h3'>
												Total: ${order.totalPrice}
											</Typography>

											<Divider />

											{!order.isPaid && (
												<CardActions>
													{loadingPay && <Loader />}

													{isPending ? (
														<Loader />
													) : (
														<Stack width='100%' spacing={2} sx={{ zIndex: 0 }}>
															{/* <ButtonComponent onClick={onApproveTest}>
																Test Button
															</ButtonComponent> */}

															<PayPalButtons
																createOrder={createOrder}
																onApprove={onApprove}
																onError={onError}
																style={{ zIndex: '0' }}
															></PayPalButtons>
														</Stack>
													)}
												</CardActions>
											)}
										</Stack>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Box>
					{/* Change mt */}
					{!order.isPaid ? (
						<Box
							textAlign='center'
							m='20px 0 110px 0'
							// sx={{ width: { xs: '100%', sm: '40%' } }}
						>
							<ButtonComponent
								width='80%'
								type='button'
								backgroundColor={shades.neutral[500]}
								onClick={() => deleteHandler(order._id)}
							>
								Cancel The Order
							</ButtonComponent>
						</Box>
					) : (
						<Box textAlign='center' m='20px 0 110px 0'>
							<Link to='/'>
								<ButtonComponent
									width='80%'
									type='button'
									backgroundColor={shades.neutral[500]}
								>
									More Shopping ?
								</ButtonComponent>
							</Link>
						</Box>
					)}
				</>
			)}
		</Box>
	);
};

export default CheckoutScreen;
