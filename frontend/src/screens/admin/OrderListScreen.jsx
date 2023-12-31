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
} from '@mui/material';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
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

	return (
		<Box
			sx={{
				m: { md: '30px auto', xs: '10px auto' },
				width: { xs: '95%', sm: '90%' },
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
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
							</Table>
						</TableContainer>
					</Paper>
				</>
			)}
		</Box>
	);
};

export default OrderListScreen;
