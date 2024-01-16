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
import { useGetItemsByAdminQuery } from '../../slices/itemsApiSlice';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';
import ButtonComponent from '../../components/Utils/ButtonComponent';
import { useGetProfileDetailsQuery } from '../../slices/usersApiSlice';

const ItemsListScreen = () => {
	const { data: items, isLoading, error } = useGetItemsByAdminQuery();

	const { data: userProfile, isLoading: loadingProfile } =
		useGetProfileDetailsQuery();

	const columns = [
		{ id: 'item', label: 'ITEM', minWidth: 160 },
		{ id: 'item_name', label: 'ITEM NAME', minWidth: 140 },
		{ id: 'brand', label: 'BRAND', minWidth: 130 },
		{ id: 'category', label: 'CATEGORY', minWidth: 120 },
		{ id: 'price', label: '$ PRICE', minWidth: 110, align: 'right' },
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
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				mb='20px'
			>
				<Typography variant='h3'>
					Items <b>List</b>
				</Typography>

				{/* Only create admin User */}
				{!loadingProfile && userProfile.isAdmin && (
					<Box sx={{ width: { sm: '30%', md: '20%' } }}>
						<Link to='/admin/create'>
							<ButtonComponent backgroundColor={shades.neutral[600]}>
								<EditNoteOutlinedIcon sx={{ fontSize: '20px', mr: '5px' }} />{' '}
								CREATE ITEM
							</ButtonComponent>
						</Link>
					</Box>
				)}
			</Box>

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
										<StyledTableCell
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-around',
												gap: 8,
											}}
										>
											<Link to={`/admin/item/${item._id}/edit`}>
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
											</Link>
											<Link to={`/admin/item/${item._id}/edit`}>
												{item._id}
											</Link>
										</StyledTableCell>
										<StyledTableCell>{item.name}</StyledTableCell>
										<StyledTableCell>{item.brand}</StyledTableCell>
										<StyledTableCell>{item.category}</StyledTableCell>
										<StyledTableCell
											align='right'
											style={{ paddingRight: '20px' }}
										>
											$ {item.price}
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

export default ItemsListScreen;
