import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import Shipping from '../components/Checkout/Shipping';
import ButtonComponent from '../components/Utils/ButtonComponent';
import { saveBillingAddress, saveShippingAddress } from '../slices/cartSlice';

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
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitHandler = (values, actions) => {
		const { firstName, lastName, address, city, state, postalCode, country } =
			values.billingAddress;

		dispatch(
			saveBillingAddress({
				firstName,
				lastName,
				address,
				city,
				state,
				postalCode,
				country,
			})
		);

		// Copy billing address onto shipping address
		if (values.shippingAddress.isSameAddress) {
			actions.setFieldValue('shippingAddress', {
				...values.billingAddress,
				isSameAddress: true,
			});
			dispatch(
				saveShippingAddress({
					...values.billingAddress,
				})
			);
		} else {
			actions.setFieldValue('shippingAddress', {
				...values.shippingAddress,
				isSameAddress: false,
			});
			dispatch(
				saveShippingAddress({
					...values.shippingAddress,
				})
			);
		}
		actions.setTouched({});

		navigate('/payment');
	};

	return (
		<Box m='0 auto' sx={{ width: { xs: '85%', sm: '80%' } }}>
			<Box sx={{ mt: { sm: '20px' } }}>
				<CheckoutSteps step={1} />
			</Box>

			<Box sx={{ mb: { md: '100px' } }}>
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

							<Box display='flex' justifyContent='space-between'>
								<Box sx={{ width: { sm: '50%' } }}>
									<ButtonComponent>NEXT</ButtonComponent>
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
