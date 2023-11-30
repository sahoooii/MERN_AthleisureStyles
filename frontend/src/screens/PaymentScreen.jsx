import { Box } from '@mui/material';
import React from 'react';
import ButtonComponent from '../components/Utils/ButtonComponent';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import { shades } from '../theme';

const PaymentScreen = () => {
	return (
		<Box>
			<CheckoutSteps step={2} />
			<Box display='flex' justifyContent='space-between'>
				<Box width='30%'>
					<Link to='/checkout'>
						<ButtonComponent
							type='button'
							backgroundColor={shades.neutral[500]}
						>
							Back
						</ButtonComponent>
					</Link>
				</Box>
				<Box sx={{ width: { sm: '50%' } }}>
					<ButtonComponent>NEXT</ButtonComponent>
				</Box>
			</Box>
		</Box>
	);
};

export default PaymentScreen;
