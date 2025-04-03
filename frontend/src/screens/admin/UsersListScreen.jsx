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
	useTheme,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';
import Paginate from '../../components/Utils/Paginate';
import Meta from '../../components/Utils/Meta';

const UsersListScreen = () => {
	const { palette } = useTheme();
	const { pageNumber } = useParams();

	const { data, isLoading, error } = useGetUsersQuery(
		{ pageNumber },
		{ keepPreviousData: true }
	);

	const columns = [
		{ id: 'user', label: 'USER', minWidth: 160 },
		{ id: 'user_name', label: 'USER NAME', minWidth: 140 },
		{ id: 'email', label: 'E-MAIL', minWidth: 140 },
		{ id: 'status', label: 'STATUS', minWidth: 130 },
		{ id: 'create_at', label: 'CREATE AT', minWidth: 120, align: 'left' },
	];

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: shades.blue[400],
			color: 'white',
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			padding: '8px 14px',
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
				minHeight: '600px',
			}}
		>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Meta title='All Users List' />

					<Typography variant='h3' sx={{ mb: '20px' }}>
						All <b>Users</b>
					</Typography>

					<Paper sx={{ width: '100%', overflow: 'hidden' }}>
						<TableContainer sx={{ maxHeight: { xs: 500, sm: 800, md: 440 } }}>
							<Table
								stickyHeader
								aria-label='sticky table'
								sx={{ minWidth: 654 }}
							>
								<TableHead>
									<TableRow>
										{columns.map((column, index) => (
											<StyledTableCell
												key={`${column._id}-${index}`}
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
									{data.users.map((user) => (
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
												align='left'
												// style={{ paddingRight: '20px' }}
											>
												{user.createdAt.substring(0, 10)}
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					{!isLoading && data?.pages && (
						<Paginate
							pages={data.pages}
							page={data.page}
							menu='userslist'
							isAdmin={true}
						/>
					)}

					<Box mt='20px'>
						<Link to='/'>
							<Typography
								variant='h4'
								sx={{
									textDecoration: 'underline',
									color: palette.blue.main,
									'&:hover': {
										cursor: 'pointer',
										color: palette.blue.light,
									},
								}}
							>
								Back To Home?
							</Typography>
						</Link>
					</Box>
				</>
			)}
		</Box>
	);
};

export default UsersListScreen;
