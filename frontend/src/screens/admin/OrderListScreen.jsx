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
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';

const OrderListScreen = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery();
	// console.log(orders);

	const columns = [
		{ id: 'id', label: 'ID', minWidth: 170 },
		{ id: 'user', label: 'USER NAME', minWidth: 170 },
		{ id: 'order_date', label: 'ORDER DATE', minWidth: 170, align: 'right' },
		{ id: 'total_price', label: '$ TOTAL', minWidth: 170, align: 'right' },
		{ id: 'paid_at', label: 'PAID AT', minWidth: 170, align: 'right' },
		{
			id: 'delivered_at',
			label: 'DELIVERED AT',
			minWidth: 170,
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
			backgroundColor: theme.palette.action.hover,
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
				width: { xs: '95%', sm: '95%' },
			}}
		>
			<Typography variant='h3' sx={{ mb: '20px' }}>
				All <b>Orders</b>
			</Typography>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Paper sx={{ width: '100%', overflow: 'hidden' }}>
						<TableContainer sx={{ maxHeight: 440 }}>
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
									{orders.map((order) => (
										<StyledTableRow key={order._id} hover>
											<StyledTableCell>{order._id}</StyledTableCell>
											<StyledTableCell>
												{order.user &&
													`${order.user.firstName} ${order.user.lastName}`}
											</StyledTableCell>
											<StyledTableCell align='right'>
												{order.createdAt.substring(0, 10)}
											</StyledTableCell>
											<StyledTableCell align='right'>
												$ {order.totalPrice}
											</StyledTableCell>
											<StyledTableCell align='right'>
												{order.isPaid ? (
													order.paidAt.substring(0, 10)
												) : (
													<CloseOutlinedIcon sx={{ color: '#FF0000' }} />
												)}
											</StyledTableCell>
											<StyledTableCell align='right'>
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
				</>
			)}
		</Box>
	);
};

export default OrderListScreen;
