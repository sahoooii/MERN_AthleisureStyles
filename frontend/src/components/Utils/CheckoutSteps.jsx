import React from 'react';
import { Step, Stepper, StepLabel } from '@mui/material';

const CheckoutSteps = ({ step }) => {
	const steps = ['Checkout', 'Select Payment', 'Place Order', 'Pay' ];
	return (
		<Stepper activeStep={step} alternativeLabel sx={{ m: '20px 0' }}>
			{steps.map((label) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export default CheckoutSteps;
