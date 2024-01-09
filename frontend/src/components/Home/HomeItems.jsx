import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	IconButton,
	Typography,
	Box,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useGetItemsQuery } from '../../slices/itemsApiSlice';
import { FavoriteBorder } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RatingLogic from '../Utils/RatingLogic';
import Loader from '../Utils/Loader';
import Message from '../Utils/Message';
import { shades } from '../../theme';

const HomeItems = () => {
	const { data: items, isLoading, error } = useGetItemsQuery();
	// console.log(items);

	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');

	// Edit later
	const handleLike = () => {};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<Box
					margin='0 auto'
					display='grid'
					gridTemplateColumns='repeat(auto-fill, 300px)'
					justifyContent='space-around'
					rowGap='40px'
					columnGap='1.33%'
				>
					{items.map((item) => (
						<Card
							key={item._id}
							sx={{
								width: 300,
								maxWidth: '100%',
								boxShadow: 'md',
							}}
						>
							{item.countInStock === 0 ? (
								<Box position='relative'>
									<CardMedia
										component='img'
										height='400px'
										width='300px'
										image={item.image}
										alt={item.name}
										style={{
											cursor: 'pointer',
											opacity: '0.5',
											// objectFit: 'cover',
										}}
										onClick={() => navigate(`/item/${item._id}`)}
									/>
									<Typography
										variant='h3'
										color={shades.green[800]}
										fontWeight='bold'
										sx={{
											position: 'absolute',
											bottom: '25px',
											left: '25px',
										}}
									>
										Out Of Stock
									</Typography>
								</Box>
							) : (
								<CardMedia
									component='img'
									height='400px'
									width='300px'
									image={item.image}
									alt={item.name}
									style={{ cursor: 'pointer' }}
									onClick={() => navigate(`/item/${item._id}`)}
								/>
							)}

							<CardContent sx={{ paddingBottom: '8px' }}>
								<Link
									to={`/item/${item._id}`}
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									<Typography variant='h3' marginBottom='10px'>
										{item.name}
									</Typography>
								</Link>

								{/* Rating */}
								<Box display='flex' alignItems='center' marginBottom='5px'>
									<RatingLogic rating={item.rating} />
									{item.numReviews > 0 && (
										<Typography variant='subtitle2' ml='8px'>
											{item.numReviews} Reviews
										</Typography>
									)}
								</Box>

								<Box display='flex' justifyContent='space-between'>
									<Typography variant='h3'>${item.price}</Typography>

									{/* Will edit later */}
									<IconButton
										aria-label='add to favorites'
										onClick={handleLike}
									>
										<FavoriteBorder />
									</IconButton>
								</Box>
							</CardContent>

							{/* Only Mobile Description show up */}
							{!isNonMobile && (
								<CardActions disableSpacing sx={{ paddingTop: '0' }}>
									<Accordion>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls='panel1a-content'
											id={item._id}
										>
											<Typography paragraph sx={{ marginBottom: '0' }}>
												Description:
											</Typography>
										</AccordionSummary>
										<AccordionDetails sx={{ paddingTop: '0' }}>
											<Typography>{item.description}</Typography>
										</AccordionDetails>
									</Accordion>
								</CardActions>
							)}
						</Card>
					))}
				</Box>
			)}
		</>
	);
};

export default HomeItems;
