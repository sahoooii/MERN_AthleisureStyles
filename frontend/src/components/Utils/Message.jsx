import React from 'react';
import { Alert } from '@mui/material';

const Message = ({ severity = 'info', children }) => {
	return (
		<Alert severity={severity} sx={{ fontSize: '14px' }}>
			{children}
		</Alert>
	);
};

export default Message;
