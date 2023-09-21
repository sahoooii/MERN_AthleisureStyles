import React from 'react';
import {
	Badge,
	Box,
	IconButton,
	TextField,
	InputAdornment,
	useMediaQuery,
	Link,
} from '@mui/material';
import {
	PersonOutline,
	ShoppingBagOutlined,
	MenuOutlined,
	SearchOutlined,
	Login,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../theme';
import storeLogo from '../assets/athleisureLogoMini.png';

const Header = () => {
	// const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width:600px)');

	return (
		<Box
			display='flex'
			alignItems='center'
			width='100%'
			height='90px'
			backgroundColor={shades.babyBlue[500]}
			color={shades.primary[600]}
			position='fixed'
			top='0'
			left='0'
			zIndex='1'
		>
			<Box
				width='80%'
				margin='auto'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
			>
				<Box onClick={() => {}} sx={{ '&:hover': { cursor: 'pointer' } }}>
					<img src={storeLogo} alt='storeLogo' />
				</Box>

				{/* Icons */}
				<Box
					display='flex'
					justifyContent='space-between'
					columnGap='20px'
					zIndex='2'
				>
					{isNonMobile ? (
						<>
							<TextField
								id='search'
								type='search'
								label='Search Keyword or Category'
								sx={{ width: 250, input: { cursor: 'pointer' } }}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end' sx={{ cursor: 'pointer' }}>
											<SearchOutlined />
										</InputAdornment>
									),
								}}
							/>
							{/* <Link href='/cart'> */}
								<IconButton>
									<ShoppingBagOutlined />
								</IconButton>
							{/* </Link> */}
							{/* Link Login */}
							<IconButton>
								<Login />
								{/* <PersonOutline /> */}
							</IconButton>
						</>
					) : (
						<IconButton>
							<MenuOutlined />
						</IconButton>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Header;
