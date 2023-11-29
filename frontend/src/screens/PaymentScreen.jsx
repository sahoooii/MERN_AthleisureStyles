import { Box } from '@mui/material';
import React from 'react';
import ButtonComponent from '../components/Utils/ButtonComponent';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/Utils/CheckoutSteps';

const PaymentScreen = () => {
	return (
		<Box>
			<CheckoutSteps step={2} />
			<Link to='/checkout'>
				<Box sx={{ width: { sm: '50%' } }}>
					<ButtonComponent type='button'>BACK</ButtonComponent>
				</Box>
			</Link>
		</Box>
	);
};

export default PaymentScreen;
