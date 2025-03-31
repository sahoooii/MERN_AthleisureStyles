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
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link, useParams } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';
import Paginate from '../../components/Utils/Paginate';
import Meta from '../../components/Utils/Meta';

const OrderListScreen = () => {
	const { palette } = useTheme();

	const { pageNumber } = useParams();

	const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });
	// console.log(data);

	const columns = [
		{ id: 'id', label: 'ID', minWidth: 150 },
		{ id: 'user', label: 'USER NAME', minWidth: 120 },
		{ id: 'order_date', label: 'ORDER DATE', minWidth: 120, align: 'right' },
		{ id: 'total_price', label: '$ TOTAL', minWidth: 120, align: 'right' },
		{ id: 'paid_at', label: 'PAID AT', minWidth: 120, align: 'right' },
		{
			id: 'delivered_at',
			label: 'DELIVERED AT',
			minWidth: 120,
			align: 'right',
		},
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
				minHeight: '600px',
			}}
		>
			<Typography variant='h3' sx={{ mb: '20px' }}>
				All <b>Orders</b>
			</Typography>

			{isLoading ? (
				<Loader />
			) : data && data.orders.length === 0 ? (
				<Message severity='error'>
					Oh No! No one shopping yet!
					<Link to='/'>- Go Back</Link>
				</Message>
			) : error ? (
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Meta title='All Orders List' />
					{data.orders.length === 0 ? (
						<Message severity='error'>
							Oh No! No one shopping yet!
							<Link to='/'>- Go Back</Link>
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
										{data.orders.map((order) => (
											<StyledTableRow key={order._id} hover>
												<StyledTableCell>
													<Link
														to={`/order/${order._id}`}
														style={{ textDecoration: 'underline' }}
													>
														{order._id}
													</Link>
												</StyledTableCell>
												<StyledTableCell>
													{order.user ? (
														<Link
															to={`/admin/user/${order.user._id}/edit`}
															style={{ textDecoration: 'underline' }}
														>
															{order.user.firstName} {order.user.lastName}
														</Link>
													) : (
														<Typography>DELETED ACCOUNT</Typography>
													)}
												</StyledTableCell>
												<StyledTableCell align='right'>
													{order.createdAt.substring(0, 10)}
												</StyledTableCell>
												<StyledTableCell align='right'>
													$ {order.totalPrice}
												</StyledTableCell>
												<StyledTableCell
													align={`${order.isPaid ? 'right' : 'center'}`}
												>
													{order.isPaid ? (
														order.paidAt.substring(0, 10)
													) : (
														<CloseOutlinedIcon sx={{ color: '#FF0000' }} />
													)}
												</StyledTableCell>
												<StyledTableCell
													align={`${order.isDelivered ? 'right' : 'center'}`}
												>
													{order.isDelivered ? (
														order.deliveredAt.substring(0, 10)
													) : (
														<CloseOutlinedIcon sx={{ color: '#FF0000' }} />
													)}
												</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					)}

					<Paginate
						pages={data.pages}
						page={data.page}
						menu='orderlist'
						isAdmin={true}
					/>

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

export default OrderListScreen;
