import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { shades } from '../theme';
import { savePaymentMethod } from '../slices/cartSlice';
import ButtonComponent from '../components/Utils/ButtonComponent';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import FormComponent from '../components/auth/FormComponent';

const PaymentScreen = () => {
	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<Box m='0 auto' sx={{ width: { xs: '93%', sm: '80%' } }}>
			<CheckoutSteps step={2} />

			<Box mt='40px'>
				<FormComponent title='Select Method'>
					<Box>
						<Typography sx={{ mb: '15px', textAlign: 'center' }} variant='h3'>
							Payment Method
						</Typography>

						<Box mb='40px' textAlign='center'>
							<form>
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
							</form>
						</Box>
					</Box>

					<Box
						mb='20px'
						display='flex'
						justifyContent='space-between'
						gap='15px'
					>
						<Box sx={{ width: { xs: '50%', sm: '30%' } }}>
							<Link to='/checkout'>
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
				</FormComponent>
			</Box>
		</Box>
	);
};

export default PaymentScreen;
