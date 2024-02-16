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
	IconButton,
	useTheme,
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {
	useGetReviewsByAdminQuery,
	useUpdateReviewByAdminMutation,
} from '../../slices/itemsApiSlice';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';
import { useGetProfileDetailsQuery } from '../../slices/usersApiSlice';
import RatingLogic from '../../components/Utils/RatingLogic';
import Paginate from '../../components/Utils/Paginate';
import Meta from '../../components/Utils/Meta';

const ReviewsEditScreen = () => {
	const { palette } = useTheme();
	const { id: itemId, pageNumber } = useParams();
	// const { pageNumber } = useParams();

	const { data: user } = useGetProfileDetailsQuery();
	// console.log(user);
	const { data, isLoading, error, refetch } = useGetReviewsByAdminQuery({
		itemId,
		pageNumber,
	});
	// console.log(data && data);

	const [updateReviewsByAdmin] = useUpdateReviewByAdminMutation();

	const updateReviewHandler = async (reviewId) => {
		if (window.confirm('Would you like to delete this review ?')) {
			try {
				const deleteReview =
					data.item &&
					data.item.reviews.find(
						(review) => review._id.toString() === reviewId
					);

				// console.log('deleteReview:', deleteReview);

				await updateReviewsByAdmin({
					user: user,
					itemId: itemId,
					reviewId: reviewId,
					deleteReview: deleteReview,
				}).unwrap();

				toast.success('Review deleted successfully');

				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error.error);
			}
		}
	};

	// Item col
	const itemColumns = [
		{ id: 'item', label: 'Item', minWidth: 280 },
		{ id: 'brand', label: 'Brand', minWidth: 130 },
		{ id: 'price', label: 'PRICE', minWidth: 100, align: 'right' },
		{ id: 'numReviews', label: 'REVIEWS', minWidth: 130, align: 'right' },
		{ id: 'rating', label: 'RATING', minWidth: 150, align: 'right' },
	];

	const StyledTableCellItem = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: shades.primary[200],
			color: 'white',
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			padding: '12px 16px',
		},
	}));

	const StyledTableRowItem = styled(TableRow)(({ theme }) => ({
		backgroundColor: shades.neutral[200],
	}));

	// Reviews List
	const columns = [
		{ id: 'user', label: 'USER', minWidth: 160 },
		{ id: 'user_name', label: 'USER NAME', minWidth: 130 },
		{ id: 'comment', label: 'COMMENT', minWidth: 150 },
		{ id: 'rating', label: 'RATING', minWidth: 120, align: 'right' },
		{ id: 'posted_at', label: 'POSTED AT', minWidth: 120, align: 'right' },
		{ id: 'delete', label: 'DELETE', minWidth: 80, align: 'right' },
	];

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: shades.blue[400],
			color: 'white',
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
			padding: '12px 16px',
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
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Meta
						title={`${data.item.name}'s Reviews`}
						description={data.item.description}
					/>
					<Paper sx={{ width: '100%', overflow: 'hidden', mb: '20px' }}>
						<TableContainer>
							<Table sx={{ minWidth: 654 }}>
								<TableHead>
									<TableRow>
										{itemColumns.map((column) => (
											<StyledTableCellItem
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}
												sx={{ fontWeight: 'bold' }}
											>
												{column.label}
											</StyledTableCellItem>
										))}
									</TableRow>
								</TableHead>

								<TableBody>
									<StyledTableRowItem hover>
										<StyledTableCell
											style={{
												display: 'flex',
												alignItems: 'center',
												// justifyContent: 'space-around',
												gap: 12,
											}}
										>
											<img
												src={data.item.image}
												alt={data.item.name}
												width='55px'
												height='70px'
												style={{
													borderRadius: '3px',
													objectFit: 'cover',
												}}
											/>
											<Link
												to={`/admin/item/${itemId}/edit`}
												style={{ textDecoration: 'underline' }}
											>
												<Typography variant='h4'>{data.item.name}</Typography>
											</Link>
										</StyledTableCell>
										<StyledTableCell>{data.item.brand}</StyledTableCell>
										<StyledTableCell align='right'>
											${data.item.price}
										</StyledTableCell>
										<StyledTableCell align='right'>
											{data.item.reviews.length === 0 ? (
												<Message severity='info'>No Reviews</Message>
											) : (
												<Typography variant='h4'>
													{data.item.reviews.length} Reviews
												</Typography>
											)}
										</StyledTableCell>
										<StyledTableCell>
											{data.item.rating > 0 ? (
												<Box
													display='flex'
													alignItems='center'
													justifyContent='end'
												>
													<Typography variant='h4' mr='5px'>
														{data.item.rating}
													</Typography>
													<RatingLogic rating={data.item.rating} />
												</Box>
											) : (
												<Message severity='info'>No Rating</Message>
											)}
										</StyledTableCell>
									</StyledTableRowItem>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					{data.item.reviews.length === 0 ? (
						<Message severity='error'>No Reviews</Message>
					) : (
						<>
							<Paper sx={{ width: '100%', overflow: 'hidden' }}>
								<TableContainer
									sx={{ maxHeight: { xs: 500, sm: 800, md: 440 } }}
								>
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
											{data.paginateItem.map((review) => (
												<StyledTableRow key={review.reviews._id} hover>
													<StyledTableCell
														style={{
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'space-around',
															gap: 8,
														}}
													>
														<Link
															to={`/admin/user/${review.reviews.user}/edit`}
														>
															<img
																src={review.reviews.image}
																alt={review.reviews.name}
																width='55px'
																height='70px'
																style={{
																	borderRadius: '3px',
																	objectFit: 'cover',
																}}
															/>
														</Link>
														<Link
															to={`/admin/user/${review.reviews.user}/edit`}
															style={{ textDecoration: 'underline' }}
														>
															{review.reviews.user}
														</Link>
													</StyledTableCell>
													<StyledTableCell>
														{review.reviews.user && `${review.reviews.name}`}
													</StyledTableCell>
													<StyledTableCell>
														{review.reviews.comment}
													</StyledTableCell>
													<StyledTableCell
														align='right'
														// style={{ paddingRight: '20px' }}
													>
														{review.reviews.rating} STARS
													</StyledTableCell>
													<StyledTableCell
														align='right'
														// style={{ paddingRight: '20px' }}
													>
														{review.reviews.createdAt.substring(0, 10)}
													</StyledTableCell>
													<StyledTableCell
														align='right'
														// style={{ paddingRight: '20px' }}
													>
														<IconButton
															sx={{
																color: palette.blue.main,
																'&:hover': {
																	color: palette.blue.light,
																},
															}}
															onClick={() =>
																updateReviewHandler(review.reviews._id)
															}
														>
															<DeleteForeverOutlinedIcon fontSize='large' />
														</IconButton>
													</StyledTableCell>
												</StyledTableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Paper>

							<Paginate
								pages={data.pages}
								page={data.page}
								menu={`item/${itemId}/reviews`}
								isAdmin={true}
							/>
						</>
					)}

					<Box gridColumn='span 4' mt='25px'>
						<Link to='/admin/itemslist'>
							<Typography
								variant='h4'
								sx={{
									pb: '20px',
									textDecoration: 'underline',
									color: palette.blue.main,
									'&:hover': {
										cursor: 'pointer',
										color: palette.blue.light,
									},
								}}
							>
								Back To Items List ?
							</Typography>
						</Link>
					</Box>
				</>
			)}
		</Box>
	);
};

export default ReviewsEditScreen;
