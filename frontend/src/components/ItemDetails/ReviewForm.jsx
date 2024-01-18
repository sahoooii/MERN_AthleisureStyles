import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControl,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
	MoodBad,
	SentimentVeryDissatisfied,
	SentimentNeutral,
	SentimentSatisfiedAlt,
	SentimentVerySatisfied,
} from '@mui/icons-material';
import { shades } from '../../theme';
import {
	useGetItemDetailsQuery,
	useCreateReviewMutation,
} from '../../slices/itemsApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonComponent from '../../components/Utils/ButtonComponent';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Utils/Loader';
import Message from '../Utils/Message';

const ReviewForm = () => {
	const { itemId } = useParams();

	const { data: item, refetch } = useGetItemDetailsQuery(itemId);

	const [createReview, { isLoading: loadingCreateReview }] =
		useCreateReviewMutation();

	const { userInfo } = useSelector((state) => state.auth);

	// For Review form
	const initialReviewValue = {
		rating: '',
		comment: '',
	};

	// For Validation
	const reviewValidationSchema = yup.object().shape({
		rating: yup.number().required('Please rating this item'),
		comment: yup.string().required('Let us know, something your comment'),
	});

	const submitHandler = async (values, onSubmitProps) => {
		const { rating, comment } = values;

		try {
			await createReview({
				itemId,
				rating,
				comment,
			}).unwrap();

			refetch();

			toast.success('Review added successfully');

			onSubmitProps.resetForm();
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<Box flex='1 1 50%' sx={{ marginTop: { xs: '20px' } }}>
			<Box>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id={item._id}
					>
						<Typography variant='h4'>Write a Review:</Typography>
					</AccordionSummary>

					{loadingCreateReview && <Loader />}
					{/* Review Form */}
					<AccordionDetails>
						<Formik
							initialValues={initialReviewValue}
							validationSchema={reviewValidationSchema}
							onSubmit={submitHandler}
						>
							{({
								values,
								errors,
								touched,
								handleBlur,
								handleChange,
								handleSubmit,
							}) => (
								<form onSubmit={handleSubmit}>
									{userInfo ? (
										<Stack spacing={2}>
											{/* Select Rating */}
											<FormControl>
												<TextField
													select
													id='rating'
													name='rating'
													label='Rating This Item'
													value={values.rating}
													onChange={handleChange}
													onBlur={handleBlur}
													error={
														Boolean(touched.rating) && Boolean(errors.rating)
													}
													helperText={touched.rating && errors.rating}
												>
													<MenuItem value={1}>
														<Box display='flex' alignItems='center'>
															<MoodBad sx={{ marginRight: '5px' }} />1 -- Nop I
															don't like it
														</Box>
													</MenuItem>
													<MenuItem value={2}>
														<Box display='flex' alignItems='center'>
															<SentimentVeryDissatisfied
																sx={{ marginRight: '5px' }}
															/>
															2 -- Maybe I give it to my sister
														</Box>
													</MenuItem>
													<MenuItem value={3}>
														<Box display='flex' alignItems='center'>
															<SentimentNeutral sx={{ marginRight: '5px' }} />3
															-- So far, So Good
														</Box>
													</MenuItem>
													<MenuItem value={4}>
														<Box display='flex' alignItems='center'>
															<SentimentSatisfiedAlt
																sx={{ marginRight: '5px' }}
															/>
															4 -- Like it!
														</Box>
													</MenuItem>
													<MenuItem value={5}>
														<Box display='flex' alignItems='center'>
															<SentimentVerySatisfied
																sx={{ marginRight: '5px' }}
															/>
															5 -- Yes!! Love it!
														</Box>
													</MenuItem>
												</TextField>
											</FormControl>
											{/* Comment */}
											<FormControl>
												<TextField
													multiline
													rows={4}
													name='comment'
													label='Enter Your Comment'
													id='comment'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.comment}
													error={
														Boolean(touched.comment) && Boolean(errors.comment)
													}
													helperText={touched.comment && errors.comment}
												/>
											</FormControl>

											<Box m='20px' display='flex' justifyContent='center'>
												<ButtonComponent
													backgroundColor={shades.blue[400]}
													disabled={loadingCreateReview}
												>
													Submit
												</ButtonComponent>
											</Box>
										</Stack>
									) : (
										<Message severity='error'>
											Please <Link to='/login'>Sign In Here </Link> to Write A
											Review.
										</Message>
									)}
								</form>
							)}
						</Formik>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Box>
	);
};

export default ReviewForm;
