import * as yup from 'yup';

export const reviewSchema = yup.object().shape({
	rating: yup
		.number()
		.integer('Rating must be an integer')
		.required('Please rate this item')
		.min(1, 'Rating must be at least 1')
		.max(5, 'Rating can be up to 5 only'),
	comment: yup
		.string()
		.required('Let us know, something your comment')
		.max(300, 'Comment has a maximum limit of 300 characters.'),
});
