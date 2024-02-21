import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { shades } from '../../../theme';

const CategoryItemTop = ({ item }) => {
	return (
		<Box flex={1} m='3px' height='70vh' position='relative'>
			<img
				src={item.img}
				alt={item.title}
				width='100%'
				height='100%'
				style={{ objectFit: 'cover' }}
			/>
			<Box
				position='absolute'
				width='100%'
				height='100%'
				top='0'
				left='0'
				display='flex'
				alignItems='center'
				flexDirection='column'
				justifyContent='center'
			>
				<Typography variant='h2' color='white' mb='20px'>
					{item.title}
				</Typography>
				<Button
					sx={{
						p: '10px',
						backgroundColor: shades.neutral[700],
						color: 'white',
						fontWeight: 600,
						fontSize: '12px',
						'&:hover': { backgroundColor: shades.neutral[500] },
					}}
				>
					SHOP NOW
				</Button>
			</Box>
		</Box>
	);
};

export default CategoryItemTop;
