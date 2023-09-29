import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	IconButton,
	Typography,
	Box,
	useTheme,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Collapse,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	ListItem,
	useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../theme';
import products from '../product';

const HomeItems = () => {
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');

	return (
		<Box
			margin='0 auto'
			display='grid'
			gridTemplateColumns='repeat(auto-fill, 300px)'
			justifyContent='space-around'
			rowGap='40px'
			columnGap='1.33%'
		>
			{products.map((product) => (
				<Card
					key={product._id}
					sx={{
						width: 300,
						maxWidth: '100%',
						boxShadow: 'md',
						// position: 'relative',
					}}
				>
					<CardMedia
						component='img'
						height='400px'
						width='300px'
						image={product.image}
						alt={product.name}
						style={{ cursor: 'pointer' }}
						onClick={() => navigate(`/item/${product._id}`)}
					/>
					<CardContent sx={{ paddingBottom: '8px' }}>
						<Link
							to={`/item/${product._id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<Typography variant='h3' marginBottom='10px'>
								{product.name}
							</Typography>
						</Link>
						<Typography variant='subtitle1' marginBottom='5px'>
							{product.numReviews} Reviews
						</Typography>
						<Box display='flex' justifyContent='space-between'>
							<Typography variant='h3'>${product.price}</Typography>
							<IconButton aria-label='add to favorites'>
								<FavoriteBorderOutlined />
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
									id={product._id}
								>
									<Typography paragraph sx={{ marginBottom: '0' }}>
										Description:{' '}
									</Typography>
								</AccordionSummary>
								<AccordionDetails sx={{ paddingTop: '0' }}>
									<Typography>{product.description}</Typography>
								</AccordionDetails>
							</Accordion>
						</CardActions>
					)}
				</Card>
			))}
		</Box>
	);
};

export default HomeItems;
