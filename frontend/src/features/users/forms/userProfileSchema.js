import * as yup from 'yup';
import { validateFile } from '../../../utils/fileValidation';

export const userProfileSchema = (isEdit = false) => {
	return yup.object().shape({
		firstName: yup.string().required('Please enter your first name'),
		lastName: yup.string().required('Please enter your last name'),
		email: yup
			.string()
			.email('Invalid email.')
			.required('Please enter your email'),
		password: yup
			.string()
			.min(6, 'Password must contain at least 6 characters')
			.required('Please enter your password'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'Password does not match')
			.required('Please enter your confirm password'),
		picturePath: yup
			.mixed()
			[isEdit ? 'notRequired' : 'required']('Please upload a profile image')
			.test('file-valid', function (value) {
				const result = validateFile(value, 'image');
				if (!result.isValid) {
					return this.createError({ message: result.error });
				}
				return true;
			}),
	});
};
