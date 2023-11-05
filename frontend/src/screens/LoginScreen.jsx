import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Stack, Box, Grid, Typography } from '@mui/material';
import FormContainer from '../components/auth/FormContainer';
import FormTextField from '../components/FormUi/FormTextField';
import SubmitButton from '../components/FormUi/SubmitButton';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submit');
	};

	return (
		<FormContainer>
			<Typography fontSize='32px' fontWeight='bold' fontFamily='Play'>
				Login
			</Typography>
		</FormContainer>
	);
};

export default LoginScreen;
