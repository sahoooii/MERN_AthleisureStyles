import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { SearchOutlined, ClearOutlined } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

const SearchInput = ({ label }) => {
	const navigate = useNavigate();
	const { keyword: urlKeyword } = useParams();
	const [keyword, setKeyword] = useState(urlKeyword || '');
	const [searchToggle, setSearchToggle] = useState(false);

	// Search Function（Enter Key or Search button）
	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
			setKeyword('');
			setSearchToggle(false); // After search, close input
		} else {
			setSearchToggle(false); // If input is empty, then close
		}
	};

	// When put search button → Open input or Close input
	const handleSearchButtonClick = () => {
		if (!searchToggle) {
			setSearchToggle(true);
		} else if (keyword.trim()) {
			submitHandler(new Event('submit')); // Do Search
		} else {
			setSearchToggle(false); // If input is empty, then close
		}
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<AnimatePresence>
				{searchToggle && (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						transition={{ duration: 0.5 }}
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<form
							onSubmit={submitHandler}
							style={{ display: 'flex', alignItems: 'center' }}
						>
							<TextField
								id='search'
								type='text'
								label={label}
								name='keyword'
								autoFocus
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
								sx={{
									width: { xs: 170, sm: 250 },
									input: { cursor: 'pointer' },
								}}
								color='blue'
								InputProps={{
									style: {
										borderRadius: '10px',
									},
									endAdornment: (
										<InputAdornment position='end'>
											{/* When input keyword, show up clear button */}
											{keyword && (
												<IconButton
													onClick={() => setKeyword('')}
													sx={{ cursor: 'pointer' }}
												>
													<ClearOutlined />
												</IconButton>
											)}
										</InputAdornment>
									),
								}}
							/>
						</form>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Search button (Search or open close function) */}
			<IconButton
				component={motion.button}
				onClick={handleSearchButtonClick}
				sx={{ ml: searchToggle ? '5px' : 0 }}
			>
				<SearchOutlined sx={{ fontSize: '30px' }} />
			</IconButton>
		</Box>
	);
};

export default SearchInput;
