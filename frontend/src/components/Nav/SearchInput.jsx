import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

const SearchInput = ({ label }) => {
	const [searchToggle, setSearchToggle] = useState(false);

	return (
		<>
			{!searchToggle ? (
				<IconButton
					component={motion.button}
					sx={{ mr: { xs: '30px', sm: 0 } }}
					onClick={() => setSearchToggle(!searchToggle)}
				>
					<SearchOutlined />
				</IconButton>
			) : (
				<>
					<Box
						component={motion.div}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						// exit={{ opacity: 0, x: 20 }}
						transition={{ duration: 0.3 }}
					>
						<Box component={motion.div}>
							<TextField
								id='search'
								type='text'
								label={label}
								sx={{
									width: { xs: 180, sm: 250 },
									input: { cursor: 'pointer' },
								}}
								color='blue'
								InputProps={{
									style: {
										borderRadius: '10px',
									},
									endAdornment: (
										<InputAdornment position='end' sx={{ cursor: 'pointer' }}>
											<SearchOutlined />
										</InputAdornment>
									),
								}}
							/>
						</Box>
					</Box>

					<IconButton
						sx={{ pl: '0px' }}
						onClick={() => setSearchToggle(!searchToggle)}
					>
						<ClearOutlined />
					</IconButton>
				</>
			)}
		</>
	);
};

export default SearchInput;
