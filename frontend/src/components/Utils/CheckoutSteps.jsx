import React from 'react';
import { Step, Stepper, StepLabel } from '@mui/material';

const CheckoutSteps = ({ step }) => {
	const steps = ['Sign In', 'Checkout', 'Payment', 'Place Order'];
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
