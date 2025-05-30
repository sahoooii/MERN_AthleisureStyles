import * as yup from 'yup';

export const orderUserInfoSchema = yup.object().shape({
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
