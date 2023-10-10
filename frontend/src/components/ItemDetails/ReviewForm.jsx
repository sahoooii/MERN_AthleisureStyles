import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControl,
	MenuItem,
	Stack,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	MoodBad,
	SentimentVeryDissatisfied,
	SentimentNeutral,
	SentimentSatisfiedAlt,
	SentimentVerySatisfied,
} from '@mui/icons-material';
import { shades } from '../../theme';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormTextField from '../FormUi/FormTextField';
import SelectForm from '../FormUi/SelectForm';
import SubmitButton from '../FormUi/SubmitButton';

const ReviewForm = ({ item }) => {
	// For Review form
	const initialReviewValue = {
		rate: '',
		comment: '',
	};

	// For Validation
	const reviewValidationSchema = yup.object().shape({
		rate: yup.number().required('Please rating this item'),
		comment: yup.string().required('Let us know, something your comment'),
	});

	// onSubmit function later

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
							<Form>
								<Stack spacing={2}>
									{/* Select Reviews */}
									<SelectForm name='rate' label='Rating This Item'>
										<MenuItem value={1}>
											<Box display='flex' alignItems='center'>
												<MoodBad sx={{ marginRight: '5px' }} />1 -- Nop I don't
												like it
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
												<SentimentNeutral sx={{ marginRight: '5px' }} />3 -- So
												far, So Good
											</Box>
										</MenuItem>
										<MenuItem value={4}>
											<Box display='flex' alignItems='center'>
												<SentimentSatisfiedAlt sx={{ marginRight: '5px' }} />4
												-- Like it!
											</Box>
										</MenuItem>
										<MenuItem value={5}>
											<Box display='flex' alignItems='center'>
												<SentimentVerySatisfied sx={{ marginRight: '5px' }} />5
												-- Yes!! Love it!
											</Box>
										</MenuItem>
									</SelectForm>
									{/* Comment */}
									<FormControl>
										<FormTextField
											name='comment'
											label='Comment'
											multiline
											rows={4}
										/>
									</FormControl>

									<Box m='20px' display='flex' justifyContent='center'>
										<SubmitButton
											children='Submit'
											backgroundColor={shades.blue[400]}
										/>
									</Box>
								</Stack>
							</Form>
						</Formik>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Box>
	);
};

export default ReviewForm;
