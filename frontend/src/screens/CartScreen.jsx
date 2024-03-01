import React from 'react';
import {
	Box,
	Divider,
	IconButton,
	Typography,
	Grid,
	Stack,
	Select,
	InputLabel,
	FormControl,
	MenuItem,
	Card,
	CardContent,
	CardActions,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import ButtonComponent from '../components/Utils/ButtonComponent';
import Message from '../components/Utils/Message';
import CloseIcon from '@mui/icons-material/Close';
import Meta from '../components/Utils/Meta';

const CartScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const { userInfo } = useSelector((state) => state.auth);

	// Change the quantity of items
	// quantity = selected value of quantity
	const addToCartHandler = (item, quantity) => {
		dispatch(addToCart({ ...item, quantity }));
	};

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	// Check login or not
	const checkoutHandler = () => {
		if (userInfo) {
			navigate('/shipping');
		} else {
			navigate('/login?redirect=/shipping');
		}
	};

	return (
		<Box margin='0 auto' sx={{ width: { xs: '90%', sm: '90%' } }}>
			{cartItems.length === 0 ? (
				<Message severity='error'>
					Oh No! Your cart is empty
					<Link to='/'> - Go Back</Link>
				</Message>
			) : (
				<Box sx={{ flexGrow: 1, alignItems: 'center' }}>
					<Grid container spacing={2} mt='15px'>
						<Grid item md={8} xs={12}>
							<Box>
								<Box mb='30px'>
									<Typography variant='h3'>Shopping Cart</Typography>
								</Box>

								<Meta
									title={`${userInfo.firstName} ${userInfo.lastName}'s Cart`}
								/>

								{/* Shopping Cart */}
								<Box>
									{cartItems.map((item) => (
										<Box key={item._id}>
											<Grid container m='15px 0'>
												<Grid item sm={4} xs={5}>
													<img
														src={item.image}
														alt={item.name}
														width='120px'
														height='160px'
														style={{
															borderRadius: '3px',
															objectFit: 'cover',
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

						{/* OrderSummary */}
						<Grid
							item
							md={4}
							xs={12}
							sx={{
								mt: { xs: '25px', md: '35px' },
								// mb: { xs: '80px', sm: '0' },
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

										<CardActions>
											<ButtonComponent
												type='button'
												disabled={cartItems.length === 0}
												onClick={checkoutHandler}
											>
												Proceed To Checkout
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

export default CartScreen;
