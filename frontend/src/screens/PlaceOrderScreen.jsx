import React, { useEffect } from 'react';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCartItems, removeFromCart } from '../slices/cartSlice';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { shades } from '../theme';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import Message from '../components/Utils/Message';
import Loader from '../components/Utils/Loader';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ButtonComponent from '../components/Utils/ButtonComponent';
import Meta from '../components/Utils/Meta';

const PlaceOrderScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { billingAddress, shippingAddress, paymentMethod, cartItems } = cart;

	const isBillingEmpty = Object.keys(billingAddress).length === 0;
	const isShippingEmpty = Object.keys(shippingAddress).length === 0;

	// Check fill out billingAddress and shippingAddress
	useEffect(() => {
		if (isBillingEmpty || isShippingEmpty) {
			navigate('/checkout');
		} else if (!paymentMethod) {
			navigate('/payment');
		}
	}, [isBillingEmpty, isShippingEmpty, paymentMethod, navigate]);

	// Change the quantity of items
	// quantity = selected value of quantity
	const addToCartHandler = (item, quantity) => {
		dispatch(addToCart({ ...item, quantity }));
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const [createOrder, { isLoading, error }] = useCreateOrderMutation();

	const placeOrderHandler = async () => {
		try {
			// Save on DB
			const response = await createOrder({
				orderItems: cartItems,
				shippingAddress: shippingAddress,
				billingAddress: billingAddress,
				paymentMethod: paymentMethod,
				itemsPrice: cart.itemsPrice,
				taxPrice: cart.taxPrice,
				shippingPrice: cart.shippingPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();

			dispatch(clearCartItems());

			// response._id = orderId
			navigate(`/order/${response._id}`);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<Box m='0 auto' sx={{ width: { xs: '90%', md: '90%' } }}>
			<Meta title='Place Order' />
			<CheckoutSteps step={2} />

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
									<Grid item xs={11}>
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

									<Grid item xs={1}>
										<Link to='/checkout'>
											<IconButton>
												<EditOutlinedIcon />
											</IconButton>
										</Link>
									</Grid>
								</Grid>

								<Divider />

								<Grid container m='14px 0'>
									<Grid item xs={11}>
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

									<Grid item xs={1}>
										<Link to='/checkout'>
											<IconButton>
												<EditOutlinedIcon />
											</IconButton>
										</Link>
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

								<Box>
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
														<Link
															to={`/item/${item._id}`}
															style={{ textDecoration: 'underline' }}
														>
															<Typography
																sx={{ fontSize: { xs: '12px', sm: '16px' } }}
																fontWeight='bold'
																color='secondary'
															>
																{item.name}
															</Typography>
														</Link>
														<Typography variant='h4' fontWeight='bold'>
															${item.price}
														</Typography>
														{/* Quantity */}
														<FormControl
															sx={{ m: 1, width: { sm: 120, xs: 100 } }}
														>
															<InputLabel id='quantity'>Quantity</InputLabel>
															<Select
																labelId='quantity'
																id='quantity'
																name='quantity'
																color='neutral'
																label='Quantity'
																value={item.quantity}
																onChange={(e) =>
																	addToCartHandler(item, Number(e.target.value))
																}
															>
																{[...Array(item.countInStock).keys()].map(
																	(quantity) => (
																		<MenuItem
																			key={quantity + 1}
																			value={quantity + 1}
																		>
																			{quantity + 1}
																		</MenuItem>
																	)
																)}
															</Select>
														</FormControl>
													</Stack>
												</Grid>
												{/* Delete Items Button */}
												<Grid item xs={1}>
													<IconButton
														onClick={() => removeFromCartHandler(item._id)}
													>
														<CloseIcon />
													</IconButton>
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

										<Typography>
											{error && <Message severity='error'>{error}</Message>}
										</Typography>

										{isLoading && <Loader />}

										<CardActions>
											<ButtonComponent
												type='button'
												disabled={cartItems.length === 0}
												onClick={placeOrderHandler}
											>
												Place Order
											</ButtonComponent>
										</CardActions>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			)}

			<Box textAlign='center' m='20px 0 100px 0'>
				<Link to='/payment'>
					<ButtonComponent
						width='40%'
						type='button'
						backgroundColor={shades.neutral[500]}
					>
						Back
					</ButtonComponent>
				</Link>
			</Box>
		</Box>
	);
};

export default PlaceOrderScreen;
