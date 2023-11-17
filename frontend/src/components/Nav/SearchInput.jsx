import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

const SearchInput = ({ label }) => {
	const [searchToggle, setSearchToggle] = useState(false);

	return (
		<>
			{!searchToggle ? (
				<IconButton
					sx={{ mr: { xs: '30px', sm: 0 } }}
					onClick={() => setSearchToggle(!searchToggle)}
				>
					<SearchOutlined />
				</IconButton>
			) : (
				<>
					<TextField
						id='search'
						type='text'
						label={label}
						sx={{ width: { xs: '55%', sm: 250 }, input: { cursor: 'pointer' } }}
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
