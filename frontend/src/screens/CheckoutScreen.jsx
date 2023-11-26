import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import CheckoutSteps from '../components/Utils/CheckoutSteps';

const CheckoutScreen = () => {
	return (
		<Box width='80%' m='0 auto'>
			<CheckoutSteps step={1} />
		</Box>
	);
};

export default CheckoutScreen;
