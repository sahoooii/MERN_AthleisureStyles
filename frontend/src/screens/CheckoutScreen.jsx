import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import Shipping from '../components/Checkout/Shipping';
import ButtonComponent from '../components/Utils/ButtonComponent';
import { shades } from '../theme';
import { Link } from 'react-router-dom';

const initialFormValues = {
	billingAddress: {
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		state: '',
		postalCode: '',
		country: '',
	},
	shippingAddress: {
		isSameAddress: true,
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		state: '',
		postalCode: '',
		country: '',
	},
};
const formSchema = yup.object().shape({
	billingAddress: yup.object().shape({
		firstName: yup.string().required('Please enter first name'),
		lastName: yup.string().required('Please enter last name'),
		address: yup.string().required('Please enter address'),
		city: yup.string().required('Please enter city'),
		state: yup.string().required('Please enter State'),
		postalCode: yup.string().required('Please enter postal code'),
		country: yup.string().required('Please enter country'),
	}),
	shippingAddress: yup.object().shape({
		isSameAddress: yup.boolean(),
		firstName: yup.string().when('isSameAddress', {
			is: false,
			then: () => yup.string().required('Please enter first name'),
		}),
		lastName: yup.string().when('isSameAddress', {
			is: false,
			then: () => yup.string().required('Please enter last name'),
		}),
		address: yup.string().when('isSameAddress', {
			is: false,
			then: () => yup.string().required('Please enter address'),
		}),
		city: yup.string().when('isSameAddress', {
			is: false,
			then: () => yup.string().required('Please enter city'),
		}),
		state: yup.string().when('isSameAddress', {
			is: false,
			then: () => yup.string().required('Please enter state'),
		}),
		postalCode: yup.string().when('isSameAddress', {
			is: false,
			then: () => yup.string().required('Please enter postal code'),
		}),
		country: yup.string().when('isSameAddress', {
			is: false,
			then: () => yup.string().required('Please enter country'),
		}),
	}),
});

// add error handling
const CheckoutScreen = () => {
	const submitHandler = (values, actions) => {
		// Copy billing address onto shipping address
		if (values.shippingAddress.isSameAddress) {
			actions.setFieldValue('shippingAddress', {
				...values.billingAddress,
				isSameAddress: true,
			});
		}
	};

	return (
		<Box m='0 auto' sx={{ width: { xs: '85%', sm: '80%' } }}>
			<Box sx={{ mt: { sm: '20px' } }}>
				<CheckoutSteps step={1} link='/checkout' />
			</Box>

			<Box>
				<Formik
					initialValues={initialFormValues}
					validationSchema={formSchema}
					onSubmit={submitHandler}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
						setFieldValue,
					}) => (
						<form onSubmit={handleSubmit}>
							<Shipping
								values={values}
								errors={errors}
								touched={touched}
								handleBlur={handleBlur}
								handleChange={handleChange}
								setFieldValue={setFieldValue}
							/>

							<Box display='flex' justifyContent='space-between' gap='10px'>
								<Box width='30%'>
									<Link to='/cart'>
										{/* bg color */}
										<ButtonComponent
											type='button'
											backgroundColor={shades.neutral[500]}
										>
											Back
										</ButtonComponent>
									</Link>
								</Box>
								<Box width='50%'>
									<Link to='/payment'>
										<ButtonComponent>NEXT</ButtonComponent>
									</Link>
								</Box>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

export default CheckoutScreen;
