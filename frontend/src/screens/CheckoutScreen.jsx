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
import { useDispatch, useSelector } from 'react-redux';
import {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import Message from '../components/Utils/Message';
import Loader from '../components/Utils/Loader';
import ButtonComponent from '../components/Utils/ButtonComponent';

const CheckoutScreen = () => {
	// Get order details probably will change
	const { id: orderId } = useParams();
	// use next page summary
	const {
		data: order,
		refetch,
		isLoading,
		isError,
	} = useGetOrderDetailsQuery(orderId);

	const cart = useSelector((state) => state.cart);
	const { billingAddress, shippingAddress, paymentMethod, cartItems } = cart;

	// From here PayPal
	const { userInfo } = useSelector((state) => state.auth);

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
			if (!window.paypal) {
				loadPayPalScript();
			}
		}
	}, [paypal, paypalDispatch, loadingPayPal, errorPayPal]);

	return (
		<Box m='0 auto' sx={{ width: { xs: '90%', md: '90%' } }}>
			<CheckoutSteps step={3} />

			{cartItems.length === 0 ? (
				<Message severity='error'>
					Oh No! Your cart is empty
					<Link to='/'> - Go Back</Link>
				</Message>
			) : (
				<Box
					sx={{
						flexGrow: 1,
						alignItems: 'center',
						mt: '30px',
						mb: { sm: '40px' },
					}}
				>
					<Grid container mt='10px' spacing={3}>
						<Grid item md={8} xs={12}>
							<Box>
								<Box mb='25px'>
									<Typography variant='h3' fontWeight='bold'>
										Your Information
									</Typography>
								</Box>

								{/* Information */}
								<Grid container m='14px 0'>
									<Grid item xs={12}>
										<Stack spacing={1}>
											<Typography variant='h3'>Shipping Address</Typography>
											<Typography variant='subtitle1'>
												<strong>Name:</strong> {shippingAddress.firstName}{' '}
												{shippingAddress.lastName}
											</Typography>
											<Typography variant='subtitle1'>
												<strong>Address:</strong> {shippingAddress.address},{' '}
												{shippingAddress.city}, {shippingAddress.state},{' '}
												{shippingAddress.postalCode}, {shippingAddress.country}
											</Typography>
										</Stack>
									</Grid>
								</Grid>

								<Divider />

								<Grid container m='14px 0'>
									<Grid item xs={12}>
										<Stack spacing={1}>
											<Typography variant='h3'>Billing Address</Typography>
											<Typography variant='subtitle1'>
												<strong>Name:</strong> {billingAddress.firstName}{' '}
												{billingAddress.lastName}
											</Typography>
											<Typography variant='subtitle1'>
												<strong>Address:</strong> {billingAddress.address},{' '}
												{billingAddress.city}, {billingAddress.state},{' '}
												{billingAddress.postalCode}, {billingAddress.country}
											</Typography>
										</Stack>
									</Grid>
								</Grid>

								<Divider />

								<Stack spacing={1} m='14px 0'>
									<Typography variant='h3'>Payment Method</Typography>
									<Typography variant='subtitle1'>
										<strong>Method:</strong> {paymentMethod}
									</Typography>
								</Stack>

								<Divider />

								<Box sx={{ mb: { md: '100px' } }}>
									<Typography variant='h3' sx={{ mt: '14px' }}>
										Order Items
									</Typography>
									{cartItems.map((item) => (
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
								// mb: { xs: '120px', md: '0' },
								mt: { xs: '25px', md: '35px' },
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
											{cartItems.reduce((acc, item) => acc + item.quantity, 0)})
											Items
										</Typography>

										<Typography variant='h3'>
											Items: $
											{cartItems
												.reduce(
													(acc, item) => acc + item.quantity * item.price,
													0
												)
												.toFixed(2)}
										</Typography>
										<Stack spacing={0}>
											<Typography variant='subtitle1'>
												Tax: <span>${cart.taxPrice}</span>
											</Typography>
											<Typography variant='subtitle1'>
												Shipping: <span>${cart.shippingPrice}</span>
											</Typography>
										</Stack>
										<Divider />

										<Typography variant='h3'>
											Total: ${cart.totalPrice}
										</Typography>

										<Divider />

										{/* <Typography>
											{error && <Message severity='error'>{error}</Message>}
										</Typography> */}

										{/* {isLoading && <Loader />} */}

										<CardActions>
											<ButtonComponent
												type='button'
												disabled={cartItems.length === 0}
												// onClick={placeOrderHandler}
											>
												PayPal
											</ButtonComponent>
										</CardActions>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	);
};

export default CheckoutScreen;
