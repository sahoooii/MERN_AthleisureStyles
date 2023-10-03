import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IconButton, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import {
	FavoriteBorderOutlined,
	Add,
	Remove,
	Favorite,
} from '@mui/icons-material';
import { shades } from '../theme';
import items from '../items';
import RatingLogic from '../components/RatingLogic';

const ItemDetailsScreen = () => {
	const { itemId } = useParams();
	const item = items.find((item) => item._id === itemId);

	const [count, setCount] = useState(1);
	// For tabs
	const [value, setValue] = useState('description');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box width='80%' sx={{ m: { md: '50px auto', xs: '20px auto' } }}>
			<Box display='flex' flexWrap='wrap' columnGap='40px'>
				{/* Images */}
				<Box
					flex='1 1 40%'
					sx={{ mb: { sm: '40px' } }}
					// order={{ xs: 2, sm: 1 }}
				>
					<img
						src={item.image}
						alt={item.name}
						width='100%'
						height='100%'
						style={{ objectFit: 'contain' }}
					/>
				</Box>

				{/* Right Side over mobile */}
				{/* <Box flex='1 1 50%' mb='40px' order={{ xs: 1, sm: 2 }}> */}
				<Box flex='1 1 50%' mb='90px'>
					<Box m='40px 0 15px 0'>
						<Typography mb='15px' sx={{ typography: { md: 'h2', xs: 'h3' } }}>
							{item.name}
						</Typography>
						<Box mb='5px'>
							<Typography as='span' variant='h4' mr='3px'>
								Brand:
							</Typography>
							<Typography as='span' variant='h4'>
								{item.brand}
							</Typography>
						</Box>
						<Typography variant='h3' mb='18px'>
							${item.price}
						</Typography>

						{/* Reviews */}
						<Box display='flex' alignItems='center' mb='12px'>
							<RatingLogic rating={item.rating} />
							{item.numReviews > 0 && (
								<Typography variant='span' ml='8px'>
									{item.numReviews} Reviews
								</Typography>
							)}
						</Box>

						<Box mb='5px'>
							<Typography as='span' variant='h4' mr='3px'>
								Size:
							</Typography>
							<Typography as='span' variant='h4'>
								One size fits all
							</Typography>
						</Box>
						<Box>
							<Button
								variant='outlined'
								size='large'
								color='primary'
								sx={{
									fontSize: '14px',
									fontWeight: 500,
									fontFamily: 'Play',
								}}
							>
								ONE SIZE
							</Button>
						</Box>
					</Box>

					{/* Count Button */}
					<Box mb='5px'>
						<Typography as='span' variant='h4'>
							Quantity:
						</Typography>
					</Box>

					<Box display='flex' alignItems='center' marginBottom='25px'>
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
							{/* When count=1 add disabled */}
							{count <= 1 ? (
								<IconButton disabled>
									<Remove />
								</IconButton>
							) : (
								<IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
									<Remove />
								</IconButton>
							)}
							<Typography sx={{ p: '0 5px' }}>{count}</Typography>
							<IconButton onClick={() => setCount(count + 1)}>
								<Add />
							</IconButton>
						</Box>
					</Box>

					{/* Add To Cart */}
					<Box display='flex' alignItems='center'>
						<Button
							variant='contained'
							sx={{
								backgroundColor: shades.blue[500],
								color: 'white',
								borderRadius: 1,
								minWidth: '150px',
								padding: '10px 40px',
								width: '80%',
								fontSize: '16px',
								fontFamily: 'Play',
								'&:hover': { backgroundColor: shades.blue[300] },
							}}
						>
							ADD TO CART
						</Button>
						<IconButton
							sx={{
								alignItems: 'center',
								marginLeft: '8px',
								'&:hover': { color: 'red' },
							}}
						>
							<FavoriteBorderOutlined />
						</IconButton>
					</Box>
				</Box>
			</Box>

			{/* Tabs */}
			<Box mb='20px'>
				<Tabs value={value} onChange={handleChange}>
					<Tab label='DESCRIPTION' value='description' />
					<Tab label='REVIEWS' value='reviews' />
				</Tabs>
			</Box>

			<Box display='flex' flexWrap='wrap' gap='15px' mb='100px'>
				{value === 'description' && (
					<Typography variant='h4'>{item.description}</Typography>
				)}
				{/* Reviews and Write Review */}
				<Box display='flex' flexWrap='wrap' columnGap='40px'>
						{value === 'reviews' && (
							<Box flex='1 1 40%'>
								{item.numReviews > 0 ? (
									<Box>
										<Typography variant='h4' ml='8px'>
											{item.numReviews} Reviews
										</Typography>
										<Typography variant='h4' ml='8px'>
											Show Reviews
										</Typography>
									</Box>
								) : (
									<Typography variant='h4' ml='8px'>
										No Reviews Yet
									</Typography>
								)}
							</Box>
						)}
						{/* Move later */}
					<Box flex='1 1 50%' mb='90px'>
						aaaa
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ItemDetailsScreen;
