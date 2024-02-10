import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

const SearchInput = ({ label }) => {
	const navigate = useNavigate();
	const { keyword: urlKeyword } = useParams();

	const [keyword, setKeyword] = useState(urlKeyword || '');
	const [searchToggle, setSearchToggle] = useState(false);

	// For submit keyword
	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
			setKeyword('');
		} else {
			navigate('/');
		}
	};

	// For submit keyword and animation toggle
	const handleSearch = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
			setKeyword('');
		} else {
			setSearchToggle(!searchToggle);
		}
	};

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
					<form onSubmit={submitHandler}>
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
									name='keyword'
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
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
											<InputAdornment
												position='end'
												sx={{ cursor: 'pointer' }}
												onClick={() => setKeyword('')}
											>
												<ClearOutlined />
											</InputAdornment>
										),
									}}
								/>
							</Box>
						</Box>
					</form>

					<IconButton
						sx={{ pl: '0px' }}
						onClick={handleSearch}
					>
						<SearchOutlined />
					</IconButton>
				</>
			)}
		</>
	);
};

export default SearchInput;
