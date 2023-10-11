import React from 'react';
import ButtonComponent from '../ButtonComponent';
import { useFormikContext } from 'formik';

const SubmitButton = ({
	children,
	backgroundColor,
}) => {
	const { submitForm } = useFormikContext();

	const handleSubmit = () => {
		submitForm();
	};

	return (
		<ButtonComponent
			children={children}
			backgroundColor={backgroundColor}
			onClick={handleSubmit}
		/>
	);
};

export default SubmitButton;
