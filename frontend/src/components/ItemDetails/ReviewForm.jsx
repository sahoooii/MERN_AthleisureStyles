import React, { useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	SentimentVeryDissatisfied,
	SentimentDissatisfied,
	SentimentNeutral,
	SentimentSatisfied,
	SentimentSatisfiedAlt,
} from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import ButtonComponent from '../ButtonComponent';
import { shades } from '../../theme';

const ReviewForm = ({ item }) => {
	// For review
	const [rating, setRating] = useState('');
	const [comment, setComment] = useState('');

	// For Validation
	const reviewValidationSchema = yup.object().shape({
		rate: yup.number().required('Please rating this item'),
		comment: yup.string().required('Let us know, something your comment'),
	});

	const initialReviewValue = {
		rate: '',
		comment: '',
	};

	// Review submit function
	const handleFormSubmit = async (values, onSubmitProps) => {
		console.log(values);
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
						<Typography variant='h4' sx={{ marginBottom: '0' }}>
							Write a Review:
						</Typography>
					</AccordionSummary>

					{/* Review Form */}
					<AccordionDetails>
						<Formik
							initialValues={{ ...initialReviewValue }}
							validationSchema={reviewValidationSchema}
							onSubmit={(values) => {
								console.log(values);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleBlur,
								handleSubmit,
								setFieldValue,
								handleChange,
								resetForm,
							}) => (
								<Form onSubmit={handleSubmit}>
									<Stack spacing={2}>
										<FormControl fullWidth>
											<InputLabel id='rate'>Rating This Item</InputLabel>
											<Select
												labelId='rate'
												id='rate'
												name='rate'
												value={rating}
												label='Rating'
												onChange={(e) => setRating(e.target.value)}
												color='neutral'
											>
												<MenuItem value={1}>
													<Box display='flex' alignItems='center'>
														<SentimentVeryDissatisfied
															sx={{ marginRight: '5px' }}
														/>
														1 -- Nop I don't like it
													</Box>
												</MenuItem>
												<MenuItem value={2}>
													<Box display='flex' alignItems='center'>
														<SentimentDissatisfied
															sx={{ marginRight: '5px' }}
														/>
														2 -- Maybe I give it to my sister
													</Box>
												</MenuItem>
												<MenuItem value={3}>
													<Box display='flex' alignItems='center'>
														<SentimentNeutral sx={{ marginRight: '5px' }} />3 --
														So far, So Good
													</Box>
												</MenuItem>
												<MenuItem value={4}>
													<Box display='flex' alignItems='center'>
														<SentimentSatisfied sx={{ marginRight: '5px' }} />4
														-- Like it!
													</Box>
												</MenuItem>
												<MenuItem value={5}>
													<Box display='flex' alignItems='center'>
														<SentimentSatisfiedAlt
															sx={{ marginRight: '5px' }}
														/>
														5 -- Yes!! Love it!
													</Box>
												</MenuItem>
											</Select>
										</FormControl>
										{/* Comment */}
										<FormControl fullWidth>
											<TextField
												type='text'
												label='Comment'
												onBlur={handleBlur}
												name='comment'
												multiline
												error={
													Boolean(touched.comment) && Boolean(errors.comment)
												}
												helperText={touched.comment && errors.comment}
												rows={4}
												color='neutral'
												value={values.comment}
												onChange={handleChange}
											/>
										</FormControl>
										<Box m='20px' display='flex' justifyContent='center'>
											<ButtonComponent
												children='Submit'
												backgroundColor={shades.blue[400]}
											/>
										</Box>
									</Stack>
								</Form>
							)}
						</Formik>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Box>
	);
};

export default ReviewForm;
