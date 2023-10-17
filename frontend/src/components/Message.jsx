import React from 'react';
import { Alert, Box } from '@mui/material';

const Message = ({ severity = 'info', children }) => {
	return (
		// <Box width='80%' margin='0 auto'>
			<Alert severity={severity} sx={{fontSize: '14px'}}>
				{children}
			</Alert>
		// </Box>
	);
};

export default Message;
