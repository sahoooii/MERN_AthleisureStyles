import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Typography,
	useMediaQuery,
	useTheme,
	TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import FormComponent from '../../components/auth/FormComponent';
import ButtonComponent from '../../components/Utils/ButtonComponent';
import Loader from '../../components/Utils/Loader';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const CreateItemScreen = () => {
	return <div>CreateItemScreen</div>;
};

export default CreateItemScreen;
