import { Box } from '@mui/material';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/Utils/CheckoutSteps';
import Shipping from '../components/Checkout/Shipping';
import ButtonComponent from '../components/Utils/ButtonComponent';
import { saveBillingAddress, saveShippingAddress } from '../slices/cartSlice';
import { shades } from '../theme';
import Meta from '../components/Utils/Meta';
import { orderUserInfoSchema } from '../features/orders/orderUserInfoSchema';

const ShippingBillingScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	const cart = useSelector((state) => state.cart);
	const { billingAddress, shippingAddress } = cart;

	const initialFormValues = {
		billingAddress: {
			firstName: billingAddress.firstName ? billingAddress.firstName : '',
			lastName: billingAddress.lastName ? billingAddress.lastName : '',
			address: billingAddress.address ? billingAddress.address : '',
			city: billingAddress.city ? billingAddress.city : '',
			state: billingAddress.state ? billingAddress.state : '',
			postalCode: billingAddress.postalCode ? billingAddress.postalCode : '',
			country: billingAddress.country ? billingAddress.country : '',
		},
		shippingAddress: {
			isSameAddress: shippingAddress.isSameAddress
				? shippingAddress.isSameAddress
				: true,
			firstName: shippingAddress.firstName ? shippingAddress.firstName : '',
			lastName: shippingAddress.lastName ? shippingAddress.lastName : '',
			address: shippingAddress.address ? shippingAddress.address : '',
			city: shippingAddress.city ? shippingAddress.city : '',
			state: shippingAddress.state ? shippingAddress.state : '',
			postalCode: shippingAddress.postalCode ? shippingAddress.postalCode : '',
			country: shippingAddress.country ? shippingAddress.country : '',
		},
	};

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
					isSameAddress: true,
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
		navigate('/payment');
	};

	return (
		<Box m='0 auto' sx={{ width: { xs: '85%', sm: '80%' } }}>
			<Meta
				title={`${userInfo.firstName} ${userInfo.lastName}'s Information`}
			/>

			<Box sx={{ mt: { sm: '20px' } }}>
				<CheckoutSteps step={0} />
			</Box>

			<Box sx={{ mb: { md: '100px' } }}>
				<Formik
					initialValues={initialFormValues}
					validationSchema={orderUserInfoSchema}
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

							<Box display='flex' justifyContent='space-between' gap='15px'>
								<Box sx={{ width: { xs: '50%', sm: '30%' } }}>
									<Link to='/cart'>
										<ButtonComponent
											type='button'
											backgroundColor={shades.neutral[500]}
										>
											Back
										</ButtonComponent>
									</Link>
								</Box>
								<Box width='50%'>
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

export default ShippingBillingScreen;
