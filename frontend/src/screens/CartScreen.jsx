import React from 'react';
import { Box, Divider, IconButton, Typography, Grid } from '@mui/material';
import ButtonComponent from '../components/ButtonComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Message from '../components/Message';
import CloseIcon from '@mui/icons-material/Close';
import QuantityButton from '../components/global/QuantityButton';
import styled from '@emotion/styled';

const CartScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { cartItems } = useSelector((state) => state.cart);
	// console.log(cartItems);

	const FlexBox = styled(Box)`
	display: flex: justify-content: space-between: align-items: center`;

	return (
		<Box margin='0 auto' sx={{ width: { xs: '90%', sm: '80%' } }}>
			{cartItems.length === 0 ? (
				<Message severity='error'>
					Oh No! Your cart is empty
					<Link to='/'> - Go Back</Link>
				</Message>
			) : (
				<Box sx={{ flexGrow: 1, alignItems: 'center' }}>
					<Grid container spacing={3}>
						<Grid item md={8} xs={12}>
							<Box>
								<FlexBox mb='15px'>
									<Typography variant='h3' mb='20px'>
										Shopping Cart ({cartItems.length})
									</Typography>
								</FlexBox>

								{/* Cart List */}
								<Box>
									{cartItems.map((item) => (
										<Box key={item._id}>
											<Grid container spacing={1} m='10px 0 10px 0'>
												<Grid item md={3} xs={12}>
													<img
														src={item.image}
														alt={item.name}
														// sx={{
														// 	width: { xs: '250px' },
														// 	height: { xs: '280px' },
														// }}
														width='123px'
														height='164px'
														style={{
															borderRadius: '3px',
														}}
													/>
												</Grid>
												<Grid item md={3} xs={12} mt='3px'>
													<Link to={`/item/${item._id}`}>
														<Typography fontWeight='bold' variant='h4'>
															{item.name}
														</Typography>
													</Link>
												</Grid>
											</Grid>
										</Box>
									))}
								</Box>
							</Box>
						</Grid>
						<Grid item md={4} xs={12}>
							<Typography variant='h3'>Order Summary</Typography>
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	);
};

export default CartScreen;
