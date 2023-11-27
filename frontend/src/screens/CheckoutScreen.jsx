import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import Shipping from '../components/Checkout/Shipping';

const initialFormValues = {
	billingAddress: {
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		country: '',
		postalCode: '',
	},
	shippingAddress: {
		isSameAddress: true,
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		country: '',
		postalCode: '',
	},
};
const formSchema =[
	yup.object().shape({
		billingAddress: yup.object().shape({
			firstName: yup.string().required('Required Field'),
			lastName: yup.string().required('Required Field'),
			address: yup.string().required('Required Field'),
			city: yup.string().required('Required Field'),
			country: yup.string().required('Required Field'),
			postalCode: yup.string().required('Required Field'),
		}),
		shippingAddress: yup.object().shape({
			isSameAddress: yup.boolean(),
			firstName: yup.string().when('isSameAddress', {
				is: false,
				then: () => yup.string().required('Required Field'),
			}),
			lastName: yup.string().when('isSameAddress', {
				is: false,
				then: () => yup.string().required('Required Field'),
			}),
			address: yup.string().when('isSameAddress', {
				is: false,
				then: () => yup.string().required('Required Field'),
			}),
			city: yup.string().when('isSameAddress', {
				is: false,
				then: () => yup.string().required('Required Field'),
			}),
			country: yup.string().when('isSameAddress', {
				is: false,
				then: () => yup.string().required('Required Field'),
			}),
			postalCode: yup.string().when('isSameAddress', {
				is: false,
				then: () => yup.string().required('Required Field'),
			}),
		}),
	}),
];

const CheckoutScreen = () => {
	const submitHandler = () => {};
	return (
		<Box width='80%' m='0 auto'>
			<CheckoutSteps step={1} link='/checkout' />

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
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

export default CheckoutScreen;
