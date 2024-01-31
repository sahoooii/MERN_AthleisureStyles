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
		{ id: 'user', label: 'USER', minWidth: 160 },
		{ id: 'user_name', label: 'USER NAME', minWidth: 140 },
		{ id: 'email', label: 'E-MAIL', minWidth: 140 },
		{ id: 'status', label: 'STATUS', minWidth: 130 },
		{ id: 'create_at', label: 'CREATE AT', minWidth: 120, align: 'right' },
	];

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: shades.blue[400],
			color: 'white',
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			padding: '12px 6px',
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
										<StyledTableCell
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-around',
												gap: 8,
											}}
										>
											<Link to={`/admin/user/${user._id}/edit`}>
												<img
													src={user.picturePath}
													alt={`${user.firstName} ${user.lastName}`}
													width='55px'
													height='70px'
													style={{
														borderRadius: '3px',
														objectFit: 'cover',
													}}
												/>
											</Link>
											<Link
												to={`/admin/user/${user._id}/edit`}
												style={{ textDecoration: 'underline' }}
											>
												{user._id}
											</Link>
										</StyledTableCell>
										<StyledTableCell>
											{user && `${user.firstName} ${user.lastName}`}
										</StyledTableCell>
										<StyledTableCell>
											<Link
												to={`mailto:${user.email}`}
												style={{ textDecoration: 'underline' }}
											>
												{user.email}
											</Link>
										</StyledTableCell>
										<StyledTableCell>
											{user.isAdmin ? (
												<Message severity='error'>ADMIN</Message>
											) : (
												<Message severity='success'>MEMBER</Message>
											)}
										</StyledTableCell>
										<StyledTableCell
											align='right'
											style={{ paddingRight: '20px' }}
										>
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
