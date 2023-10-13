import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Box, Typography, Button } from '@mui/material';
import { FavoriteBorderOutlined, Add, Remove } from '@mui/icons-material';
import { shades } from '../theme';
import { useGetItemDetailsQuery } from '../slices/itemsApiSlice';
import RatingLogic from '../components/RatingLogic';
import ItemDetailsTabs from '../components/ItemDetails/ItemDetailsTabs';
import ButtonComponent from '../components/ButtonComponent';
import OnlyLeftMessage from '../components/OnlyLeftMessage';

const ItemDetailsScreen = () => {
	const { itemId } = useParams();

	const { data: item, isLoading, error } = useGetItemDetailsQuery(itemId);

	const [count, setCount] = useState(1);

	return (
		<>
			{isLoading ? (
				<Typography
					variant='h3'
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					Loading...
				</Typography>
			) : error ? (
				<Typography
					variant='h3'
					sx={{ display: 'flex', justifyContent: 'center', color: 'red' }}
				>
					{error?.data?.message || error.error}
				</Typography>
			) : (
				<Box width='80%' sx={{ m: { md: '50px auto', xs: '20px auto' } }}>
					<Box display='flex' flexWrap='wrap' columnGap='40px'>
						{/* Images */}
						<Box flex='1 1 40%' sx={{ mb: { sm: '40px' } }}>
							<img
								src={item.image}
								alt={item.name}
								width='100%'
								height='100%'
								style={{ objectFit: 'contain' }}
							/>
						</Box>

						{/* Right Side over mobile */}
						<Box flex='1 1 50%' mb='40px'>
							<Box m='40px 0 15px 0' sx={{ mt: { sm: '10px', md: '40px' } }}>
								<Typography
									mb='15px'
									sx={{ typography: { md: 'h2', xs: 'h3' } }}
								>
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
									{item.rating && <RatingLogic rating={item.rating} />}
									{item.numReviews > 0 && (
										<Typography variant='span' ml='8px'>
											{item.numReviews} Reviews
										</Typography>
									)}
								</Box>

								{/* Size Button */}
								<Box mb='5px' display='flex' alignItems='center'>
									<Typography as='span' variant='h4' mr='3px'>
										Size:
									</Typography>
									<Typography as='span' variant='h4'>
										One size fits all
									</Typography>
								</Box>
								<Box mb='10px'>
									<Button
										variant='outlined'
										size='large'
										color='primary'
										sx={{
											fontSize: '14px',
											fontFamily: 'Play',
										}}
									>
										ONE SIZE
									</Button>
								</Box>

								{/* Stock */}
								<Box mb='10px'>
									{item.countInStock === 0 && (
										<Typography variant='h3' color='red'>
											Out Of Stock
										</Typography>
									)}
								</Box>
								{/* Stock Alert */}
								<Box mb='10px'>
									<OnlyLeftMessage item={item} />
								</Box>

								{/* Count Button */}
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
										{/* When count=1 add disabled to Remove button */}
										{count <= 1 ? (
											<IconButton disabled>
												<Remove />
											</IconButton>
										) : (
											<IconButton
												onClick={() => setCount(Math.max(count - 1, 1))}
											>
												<Remove />
											</IconButton>
										)}
										<Typography sx={{ p: '0 5px' }}>{count}</Typography>
										{/* When count=0 and over countInStock add disabled to Add button */}
										{item.countInStock === 0 || item.countInStock <= count ? (
											<IconButton disabled>
												<Add />
											</IconButton>
										) : (
											<IconButton onClick={() => setCount(count + 1)}>
												<Add />
											</IconButton>
										)}
									</Box>
								</Box>

								{/* Add To Cart */}
								<Box display='flex' alignItems='center'>
									<ButtonComponent
										children='ADD TO CART'
										disabled={item.countInStock <= 0}
									/>
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
					</Box>

					{/* Tabs */}
					<ItemDetailsTabs item={item} />
				</Box>
			)}
		</>
	);
};

export default ItemDetailsScreen;
