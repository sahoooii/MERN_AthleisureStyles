import React from 'react';
import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import AddressForm from './AddressForm';
import { useSelector } from 'react-redux';

const Shipping = ({
	values,
	errors,
	touched,
	handleBlur,
	handleChange,
	handleSubmit,
	setFieldValue,
}) => {
	const cart = useSelector((state) => state.cart);
	const { billingAddress, shippingAddress } = cart;

	return (
		<Box m='30px auto'>
			{/* Billing Form */}
			<Box>
				<Typography sx={{ mb: '15px' }} variant='h3'>
					Billing Information
				</Typography>
				<AddressForm
					type='billingAddress'
					values={billingAddress ? billingAddress : values.billingAddress}
					// values={values.billingAddress}
					errors={errors}
					touched={touched}
					handleBlur={handleBlur}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					setFieldValue={setFieldValue}
				/>
			</Box>

			<Box mt='5px'>
				<FormControlLabel
					label='Same For Shipping Address'
					control={
						<Checkbox
							defaultChecked
							value={values.shippingAddress.isSameAddress}
							onChange={() =>
								setFieldValue(
									'shippingAddress.isSameAddress',
									!values.shippingAddress.isSameAddress
								)
							}
						/>
					}
				/>
			</Box>

			{/* Shipping Address Form */}
			{!values.shippingAddress.isSameAddress && (
				<Box mt='15px'>
					<Typography sx={{ mb: '15px' }} variant='h3'>
						Shipping Information
					</Typography>
					<AddressForm
						type='shippingAddress'
						// values={shippingAddress ? shippingAddress : values.shippingAddress}
						values={values.shippingAddress}
						touched={touched}
						errors={errors}
						handleBlur={handleBlur}
						handleChange={handleChange}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Shipping;
