import React from 'react';
// import { Link } from 'react-router-dom';
import { Box, PaginationItem, Pagination, Link } from '@mui/material';

// pages=entire page num page=currentPage
const Paginate = ({ pages, page, menu, isAdmin = false, keyword = '' }) => {
	return (
		pages > 1 && (
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				m='20px 0'
			>
				<Pagination
					count={pages}
					page={page}
					renderItem={(item) => (
						<PaginationItem
							component={Link}
							href={
								!isAdmin
									? keyword
										? `/search/${keyword}/page/${item.page}`
										: `${menu}/${item.page}`
									: `/admin/${menu}/${item.page}`
							}
							{...item}
						/>
					)}
				/>
			</Box>
		)
	);
};

export default Paginate;
