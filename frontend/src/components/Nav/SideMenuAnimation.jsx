import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Box, IconButton, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@mui/icons-material';

const SideMenuAnimation = ({ style, width, height }) => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const { userInfo } = useSelector((state) => state.auth);

	const [open, setOpen] = useState(false);

	const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const variants = {
		open: {
			clipPath: 'circle(1200px at 48px 48px)',
			transition: {
				type: 'spring',
				stiffness: 20,
			},
			zIndex: 10,
		},
		closed: { clipPath: 'circle(10px at 48px -15px)' },
		transition: {
			delay: 0.5,
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	};

	return (
		<>
			<IconButton
				onClick={() => setOpen(!open)}
				sx={{
					p: 0,
					zIndex: 30,
				}}
				style={style}
				component={motion.button}
			>
				<Avatar
					src={userInfo.picturePath}
					alt={fullName}
					sx={{
						width: { width },
						height: { height },
					}}
				/>
			</IconButton>

			{/* Overlay */}
			<Box
				display={open ? 'block' : 'none'}
				backgroundColor='rgba(0,0,0,0.4)'
				position='fixed'
				zIndex={10}
				width='100%'
				height='100%'
				left='0'
				top='0'
				overflow='auto'
			></Box>
			{/* sideBar */}
			<Box
				component={motion.div}
				animate={open ? 'open' : 'closed'}
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
			>
				{/* bg */}
				<Box
					component={motion.div}
					position='fixed'
					top='0'
					right='0'
					bottom='0'
					alignItems='center'
					backgroundColor='white'
					sx={{ width: { xs: 1, sm: 'max(350px, 25%)' } }}
					variants={variants}
				>
					{/* Links */}
					<Box
						padding='30px'
						width='80%'
						m='0 auto'
						overflow='auto'
						height='100%'
						position='relative'
					>
						<Box
							sx={{
								position: 'absolute',
								top: 'auto',
								bottom: '100px',
								// right: '50%',
								left: '50%',
							}}
							display={isNonMobile ? 'block' : 'none'}
						>
							<IconButton onClick={() => setOpen(!open)}>
								<CloseOutlined />
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default SideMenuAnimation;
