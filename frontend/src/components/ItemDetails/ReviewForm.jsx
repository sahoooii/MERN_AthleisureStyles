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
import ReviewMenu from './ReviewMenu';
import { initialReviewValues } from '../../features/items/reviews/reviewInitialValues';
import { reviewSchema } from '../../features/items/reviews/reviewSchema';

const ReviewForm = () => {
	const { itemId, pageNumber } = useParams();

	const { refetch } = useGetItemDetailsQuery({
		itemId,
		pageNumber,
	});

	const [createReview, { isLoading: loadingCreateReview }] =
		useCreateReviewMutation();

	const { userInfo } = useSelector((state) => state.auth);

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
						// id={item._id}
					>
						<Typography variant='h4'>Write a Review:</Typography>
					</AccordionSummary>

					{loadingCreateReview && <Loader />}
					{/* Review Form */}
					<AccordionDetails>
						<Formik
							initialValues={initialReviewValues}
							validationSchema={reviewSchema}
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
													{ReviewMenu.map((menu) => (
														<MenuItem key={menu.value} value={menu.value}>
															<Box display='flex' alignItems='center'>
																{menu.icon} {menu.title}
															</Box>
														</MenuItem>
													))}
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
