import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import AddressForm from './AddressForm';

const Shipping = ({
	values,
	errors,
	touched,
	handleBlur,
	handleChange,
	handleSubmit,
	setFieldValue,
}) => {
	return (
		<Box m='30px auto'>
			{/* Billing Form */}
			<Box>
				<Typography sx={{ mb: '15px' }} variant='h3'>
					Billing Information
				</Typography>
				<AddressForm
					type='billingAddress'
					values={values.billingAddress}
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
							name='checkStatus'
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
