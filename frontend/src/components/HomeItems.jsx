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
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../theme';
import products from '../product';

// Open description effect
const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const HomeItems = () => {
	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

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
						position: 'relative',
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
						<Typography variant='h3'>${product.price}</Typography>
					</CardContent>
					<CardActions disableSpacing sx={{ paddingTop: '0' }}>
						<IconButton aria-label='add to favorites'>
							<FavoriteBorderOutlined />
						</IconButton>

						{/* <ExpandMore
							expand={expanded}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label='show more'
						>
							<ExpandMoreIcon />
						</ExpandMore> */}
						<Accordion>
							<AccordionSummary
								// sx={{ display: 'flex', justifyContent: 'flex-end' }}
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel1a-content'
								id={product._id}
							>
								<Typography paragraph>Description: </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>{product.description}</Typography>
							</AccordionDetails>
						</Accordion>
					</CardActions>

					{/* Description */}
					{/* <Collapse in={expanded} timeout='auto' unmountOnExit>
						<CardContent>
							<Typography paragraph>Description: </Typography>
							<Typography>{product.description}</Typography>
						</CardContent>
					</Collapse> */}
				</Card>
			))}
		</Box>
	);
};

export default HomeItems;
