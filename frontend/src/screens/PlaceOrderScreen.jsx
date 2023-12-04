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
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import Message from '../components/Utils/Message';
import CloseIcon from '@mui/icons-material/Close';
import ButtonComponent from '../components/Utils/ButtonComponent';

const PlaceOrderScreen = () => {
	const navigate = useNavigate();

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

	return (
		<Box m='0 auto' sx={{ width: '90%' }}>
			<CheckoutSteps step={3} />

			{cartItems.length === 0 ? (
				<Message severity='error'>
					Oh No! Your cart is empty
					<Link to='/'> - Go Back</Link>
				</Message>
			) : (
				<Box sx={{ flexGrow: 1, alignItems: 'center', mt: '40px' }}>
					<Grid container spacing={2} mt='15px'>
						<Grid item md={8} xs={12}>
							<Box>
								<Box
									display='flex'
									justify-content='space-between'
									align-items='center'
									mb='30px'
								>
									<Typography variant='h3'>Place Order</Typography>
								</Box>

								{/* Summary */}
								<Box>
									{cartItems.map((item) => (
										<Box key={item._id}>
											<Grid container m='15px 0'>
												<Grid item sm={4} xs={5}>
													<img
														src={item.image}
														alt={item.name}
														width='123px'
														height='164px'
														style={{
															borderRadius: '3px',
														}}
													/>
												</Grid>
												<Grid
													item
													sm={7}
													xs={5}
													sx={{ mt: { sm: '12px', xs: '8px' }, mb: '10px' }}
												>
													<Stack spacing={2}>
														<Link
															to={`/item/${item._id}`}
															style={{ textDecoration: 'underline' }}
														>
															<Typography
																sx={{ fontSize: { xs: '14px', sm: '18px' } }}
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
																// onChange={(e) =>
																// 	addToCartHandler(
																// 		item,
																// 		Number(e.target.value)
																// 	)
																// }
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
													// onClick={() => removeFromCartHandler(item._id)}
													>
														<CloseIcon />
													</IconButton>
												</Grid>
											</Grid>
										</Box>
									))}
								</Box>
							</Box>
						</Grid>
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
												(acc, item) => acc + item.quantity + item.price,
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

									<CardActions>
										<ButtonComponent
											type='button'
											disabled={cartItems.length === 0}
											// onClick={checkoutHandler}
										>
											Proceed To Checkout
										</ButtonComponent>
									</CardActions>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				</Box>
			)}
		</Box>
	);
};

export default PlaceOrderScreen;
