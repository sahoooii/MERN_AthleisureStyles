import React, { useState } from 'react';
import { Step, Stepper, StepLabel, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step }) => {
	const [activeStep, setActiveStep] = useState(0);

	const isFirstStep = activeStep === 0;
	const isSecondStep = activeStep === 1;
	const isThirdStep = activeStep === 3;
	const isFourthStep = activeStep === 4;

	return (
		<Box width='80%' m='0 auto'>
			<Stepper activeStep={step} sx={{ m: '20px 0' }}>
				<Step>
					<StepLabel>Sign In</StepLabel>
				</Step>
				<Step>
					<StepLabel>Check out</StepLabel>
				</Step>
			</Stepper>

			{/* <Step>
				<StepLabel>Checkout</StepLabel>
			</Step>
			<Step>
				<StepLabel>Payment</StepLabel>
			</Step>
			<Step>
				<StepLabel>Place Order</StepLabel>
			</Step> */}
		</Box>
	);
};

export default CheckoutSteps;
