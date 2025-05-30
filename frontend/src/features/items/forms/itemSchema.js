import * as yup from 'yup';
import { validateFile } from '../../../utils/fileValidation';

export const itemSchema = (isEdit = false) => {
	return yup.object().shape({
		name: yup.string().required('Please enter item name'),
		price: yup
			.number()
			.required('Please enter item price')
			.min(1, 'Please enter positive number or 1'),
		image: yup
			.mixed()
			[isEdit ? 'notRequired' : 'required']('Please upload an image')
			.test('file-valid', function (value) {
				const result = validateFile(value, 'image');
				if (!result.isValid) {
					return this.createError({ message: result.error });
				}
				return true;
			}),
		brand: yup.string().required('Please enter item brand name'),
		category: yup.string().required('Please enter item category'),
		code: yup
			.number()
			.required('Please enter priority code')
			.min(1, 'Please enter positive number or 1'),
		countInStock: yup
			.number()
			.required('Please enter item stock')
			.integer()
			.min(0, 'Please enter positive number or 0'),
		description: yup
			.string()
			.min(50, 'Description must contain at least 50 characters')
			.required('Please enter item description'),
	});
};
