import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { shades } from '../theme';
import { savePaymentMethod } from '../slices/cartSlice';
import ButtonComponent from '../components/Utils/ButtonComponent';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import FormComponent from '../components/FormUi/FormComponent';
import Meta from '../components/Utils/Meta';

const PaymentScreen = () => {
	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { billingAddress, shippingAddress } = cart;

	const isBillingEmpty = Object.keys(billingAddress).length === 0;
	const isShippingEmpty = Object.keys(shippingAddress).length === 0;

	// Check fill out billingAddress and shippingAddress
	useEffect(() => {
		if (isBillingEmpty || isShippingEmpty) {
			navigate('/shipping');
		}
	}, [isBillingEmpty, isShippingEmpty, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	return (
		<Box m='0 auto' sx={{ width: { xs: '93%', sm: '80%' } }}>
			<Meta title='Payment Method' />

			<CheckoutSteps step={1} />

			<Box mt='40px'>
				<FormComponent title='Select Method'>
					<Typography sx={{ m: '20px 15px', textAlign: 'center' }} variant='h3'>
						Payment Method
					</Typography>

					<form onSubmit={submitHandler}>
						<Box mb='40px' textAlign='center'>
							<FormControlLabel
								label='PayPal or Credit Card'
								control={
									<Checkbox
										checked
										id='PayPal'
										name='paymentMethod'
										value='PayPal'
										onChange={(e) => setPaymentMethod(e.target.value)}
									/>
								}
							/>
						</Box>

						<Box
							mb='40px'
							display='flex'
							justifyContent='space-between'
							gap='15px'
						>
							<Box sx={{ width: { xs: '50%', sm: '30%' } }}>
								<Link to='/shipping'>
									<ButtonComponent
										type='button'
										backgroundColor={shades.neutral[500]}
									>
										Back
									</ButtonComponent>
								</Link>
							</Box>
							<Box width='50%'>
								<ButtonComponent>NEXT</ButtonComponent>
							</Box>
						</Box>
					</form>
				</FormComponent>
			</Box>
		</Box>
	);
};

export default PaymentScreen;
