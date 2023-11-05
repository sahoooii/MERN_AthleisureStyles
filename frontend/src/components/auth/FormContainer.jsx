import React from 'react';
import { Grid, Box, Stack } from '@mui/material';

const FormContainer = ({ children }) => {
	return (
		<Box width='80%' m='0 auto'>
			{/* <Stack spacing={2}> */}
				<Grid container>
					<Grid item xs={12} md={6}>
						{children}
					</Grid>
				</Grid>
			{/* </Stack> */}
		</Box>
	);
};

export default FormContainer;
