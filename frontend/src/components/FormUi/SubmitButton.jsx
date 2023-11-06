import React from 'react';
import ButtonComponent from '../Utils/ButtonComponent';
import { useFormikContext } from 'formik';

const SubmitButton = ({ children, backgroundColor, width }) => {
	const { submitForm } = useFormikContext();

	const handleSubmit = () => {
		submitForm();
	};

	return (
		<ButtonComponent
			children={children}
			backgroundColor={backgroundColor}
			width={width}
			onClick={handleSubmit}
		/>
	);
};

export default SubmitButton;
