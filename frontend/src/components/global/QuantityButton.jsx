import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { shades } from '../../theme';

const QuantityButton = ({quantity, setQuantity, item}) => {
	return (
		<>
			<Box mb='5px'>
				<Typography as='span' variant='h4'>
					Quantity:
				</Typography>
			</Box>

			<Box
				display='flex'
				alignItems='center'
				marginBottom='20px'
				sx={{ mb: { md: '40px' } }}
			>
				<Box
					display='flex'
					alignItems='center'
					border={`1.5px solid ${shades.primary[200]}`}
					mr='20px'
					p='2px 5px'
					justifyContent='space-between'
					borderRadius={1}
					width='120px'
				>
					{/* When quantity=1 add disabled to Remove button */}
					{quantity <= 1 ? (
						<IconButton disabled>
							<Remove />
						</IconButton>
					) : (
						<IconButton onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
							<Remove />
						</IconButton>
					)}
					<Typography
						sx={{ p: '0 5px' }}
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
					>
						{quantity}
					</Typography>
					{/* When count< 0 and over countInStock add disabled to Add button */}
					{item.countInStock <= 0 || item.countInStock <= quantity ? (
						<IconButton disabled>
							<Add />
						</IconButton>
					) : (
						<IconButton onClick={() => setQuantity(quantity + 1)}>
							<Add />
						</IconButton>
					)}
				</Box>
			</Box>
		</>
	);
};

export default QuantityButton;

								// <Box mb='5px'>
								// 	<Typography as='span' variant='h4'>
								// 		Quantity:
								// 	</Typography>
								// </Box>

								// <Box
								// 	display='flex'
								// 	alignItems='center'
								// 	marginBottom='20px'
								// 	sx={{ mb: { md: '40px' } }}
								// >
								// 	<Box
								// 		display='flex'
								// 		alignItems='center'
								// 		border={`1.5px solid ${shades.primary[200]}`}
								// 		mr='20px'
								// 		p='2px 5px'
								// 		justifyContent='space-between'
								// 		borderRadius={1}
								// 		width='120px'
								// 	>
								// 		{/* When quantity=1 add disabled to Remove button */}
								// 		{quantity <= 1 ? (
								// 			<IconButton disabled>
								// 				<Remove />
								// 			</IconButton>
								// 		) : (
								// 			<IconButton
								// 				onClick={() => setQuantity(Math.max(quantity - 1, 1))}
								// 			>
								// 				<Remove />
								// 			</IconButton>
								// 		)}
								// 		<Typography
								// 			sx={{ p: '0 5px' }}
								// 			value={quantity}
								// 			onChange={(e) => setQuantity(Number(e.target.value))}
								// 		>
								// 			{quantity}
								// 		</Typography>
								// 		{/* When count< 0 and over countInStock add disabled to Add button */}
								// 		{item.countInStock <= 0 || item.countInStock <= quantity ? (
								// 			<IconButton disabled>
								// 				<Add />
								// 			</IconButton>
								// 		) : (
								// 			<IconButton onClick={() => setQuantity(quantity + 1)}>
								// 				<Add />
								// 			</IconButton>
								// 		)}
								// 	</Box>
								// </Box>

