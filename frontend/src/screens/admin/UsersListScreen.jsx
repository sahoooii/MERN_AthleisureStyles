import React from 'react';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	styled,
	tableCellClasses,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';

const UsersListScreen = () => {
	const { data: users, isLoading, error } = useGetUsersQuery();
	// console.log(users);

	const columns = [
		{ id: 'id', label: 'ID', minWidth: 150 },
		{ id: 'user', label: 'USER NAME', minWidth: 120 },
		{ id: 'email', label: 'E-MAIL', minWidth: 120 },
		{ id: 'admin', label: 'ADMIN', minWidth: 120 },
		{ id: 'create_date', label: 'CREATE DATE', minWidth: 120, align: 'right' },
	];

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: shades.blue[400],
			color: 'white',
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		'&:nth-of-type(odd)': {
			backgroundColor: shades.babyPink[200],
		},
		// hide last border
		'&:last-child td, &:last-child th': {
			border: 0,
		},
	}));

	return (
		<Box
			sx={{
				m: { md: '30px auto', xs: '10px auto' },
				width: '95%',
			}}
		>
			<Typography variant='h3' sx={{ mb: '20px' }}>
				All <b>Users</b>
			</Typography>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<Paper sx={{ width: '100%', overflow: 'hidden' }}>
					<TableContainer sx={{ maxHeight: { xs: 500, sm: 800, md: 440 } }}>
						<Table
							stickyHeader
							aria-label='sticky table'
							sx={{ minWidth: 654 }}
						>
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<StyledTableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
											sx={{ fontWeight: 'bold' }}
										>
											{column.label}
										</StyledTableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody>
								{users.map((user) => (
									<StyledTableRow key={user._id} hover>
										<StyledTableCell>
											<Link to={`/user/${user._id}`}>{user._id}</Link>
										</StyledTableCell>
										<StyledTableCell>
											{user && `${user.firstName} ${user.lastName}`}
										</StyledTableCell>
										<StyledTableCell>{user.email}</StyledTableCell>
										{/* Later */}
										<StyledTableCell>{user.isAdmin}</StyledTableCell>
										<StyledTableCell align='right'>
											{user.createdAt.substring(0, 10)}
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			)}
		</Box>
	);
};

export default UsersListScreen;
