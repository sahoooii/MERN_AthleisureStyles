import React from 'react';
import { Step, Stepper, StepLabel, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step, link }) => {
	const steps = ['Sign In', 'Checkout', 'Payment', 'Place Order'];
	return (
		<Stepper activeStep={step} alternativeLabel sx={{ m: '20px 0' }}>
			{steps.map((label) => (
				<Step key={label}>
					<Link to={link}>
						<StepLabel>{label}</StepLabel>
					</Link>
				</Step>
			))}
		</Stepper>
	);
};

export default CheckoutSteps;
