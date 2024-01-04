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
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import {
	useCreateItemMutation,
	useGetItemsQuery,
} from '../../slices/itemsApiSlice';
import { toast } from 'react-toastify';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';
import ButtonComponent from '../../components/Utils/ButtonComponent';

const ItemsListScreen = () => {
	const { data: items, isLoading, error, refetch } = useGetItemsQuery();

	const [createItem, { isLoading: loadingCreate }] = useCreateItemMutation();

	const createItemHandler = async () => {
		if (window.confirm('Do you want to create new Item ?')) {
			try {
				await createItem();
				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	const columns = [
		{ id: 'id', label: 'ID', minWidth: 150 },
		{ id: 'item_name', label: 'ITEM NAME', minWidth: 120 },
		{ id: 'price', label: '$ PRICE', minWidth: 110, align: 'right' },
		{ id: 'item_image', label: 'ITEM IMAGE', minWidth: 120, align: 'center' },
		{ id: 'brand', label: 'BRAND', minWidth: 130 },
		{ id: 'category', label: 'CATEGORY', minWidth: 120 },
	];

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: shades.blue[400],
			color: 'white',
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			padding: '8px 16px',
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
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				mb='20px'
			>
				<Typography variant='h3'>
					Items <b>Edit</b>
				</Typography>
				<Box sx={{ width: { sm: '30%', md: '20%' } }}>
					<ButtonComponent
						backgroundColor={shades.neutral[600]}
						onClick={createItemHandler}
					>
						<EditNoteOutlinedIcon sx={{ fontSize: '20px', mr: '5px' }} /> CREATE
						ITEM
					</ButtonComponent>
				</Box>
			</Box>

			{loadingCreate && <Loader />}

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
								{items.map((item) => (
									<StyledTableRow key={item._id} hover>
										<StyledTableCell>
											<Link to={`/admin/item/${item._id}`}>{item._id}</Link>
										</StyledTableCell>
										<StyledTableCell>{item.name}</StyledTableCell>
										<StyledTableCell align='right'>
											$ {item.price}
										</StyledTableCell>

										<StyledTableCell align='center'>
											<img
												src={item.image}
												alt={item.name}
												width='55px'
												height='70px'
												style={{
													borderRadius: '3px',
													objectFit: 'cover',
												}}
											/>
										</StyledTableCell>
										<StyledTableCell>{item.brand}</StyledTableCell>
										<StyledTableCell>{item.category}</StyledTableCell>
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

export default ItemsListScreen;
