import React from 'react';
import { Button } from '@mui/material';
import { shades } from '../../theme';

const ButtonComponent = ({
	children,
	backgroundColor = shades.blue[500],
	type = 'submit',
	color='white',
	width='100%',
	...otherProps
}) => {
	return (
		<Button
			variant='contained'
			type={type}
			sx={{
				backgroundColor: { backgroundColor },
				color: {color},
				borderRadius: 1,
				// minWidth: '150px',
				padding: '10px 40px',
				width: {width},
				fontSize: '16px',
				fontFamily: 'Play',
				'&:hover': { backgroundColor: shades.blue[300] },
			}}
			{...otherProps}
		>
			{children}
		</Button>
	);
};

export default ButtonComponent;
