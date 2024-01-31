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
	Grid,
	IconButton,
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {
	useGetReviewsByAdminQuery,
	useUpdateReviewByAdminMutation,
} from '../../slices/itemsApiSlice';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '@emotion/react';
import { shades } from '../../theme';
import Loader from '../../components/Utils/Loader';
import Message from '../../components/Utils/Message';
import { useGetProfileDetailsQuery } from '../../slices/usersApiSlice';

const ReviewsEditScreen = () => {
	const { palette } = useTheme();
	const { id: itemId } = useParams();

	const { data: user } = useGetProfileDetailsQuery();
	// console.log(user);
	const {
		data: item,
		isLoading,
		error,
		refetch,
	} = useGetReviewsByAdminQuery(itemId);

	const [updateReviewsByAdmin] = useUpdateReviewByAdminMutation();

	const updateReviewHandler = async (reviewId) => {
		if (window.confirm('Would you like to delete this review ?')) {
			try {
				const deleteReview =
					item &&
					item.reviews.find((review) => review._id.toString() === reviewId);

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
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<Grid
						container
						display='flex'
						alignItems='center'
						mb='10px'
						p='6px 12px'
						sx={{ backgroundColor: shades.neutral[200] }}
						borderRadius='3px'
					>
						<Grid item xs={1}>
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
						</Grid>
						<Grid item xs={4}>
							<Typography variant='h4'>{item.name}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography variant='h4'>${item.price}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography variant='h4' textAlign='end'>
								{item.rating} STARS
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography variant='h4' textAlign='end'>
								{item.reviews.length} Reviews
							</Typography>
						</Grid>
					</Grid>

					{item.reviews.length === 0 ? (
						<Message severity='error'>No Reviews</Message>
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
										{item.reviews.map((review) => (
											<StyledTableRow key={review._id} hover>
												<StyledTableCell
													style={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'space-around',
														gap: 8,
													}}
												>
													<Link to={`/admin/user/${review.user}/edit`}>
														<img
															src={review.image}
															alt={review.name}
															width='55px'
															height='70px'
															style={{
																borderRadius: '3px',
																objectFit: 'cover',
															}}
														/>
													</Link>
													<Link
														to={`/admin/user/${review.user}/edit`}
														style={{ textDecoration: 'underline' }}
													>
														{review.user}
													</Link>
												</StyledTableCell>
												<StyledTableCell>
													{review.user && `${review.name}`}
												</StyledTableCell>
												<StyledTableCell>{review.comment}</StyledTableCell>
												<StyledTableCell
													align='right'
													style={{ paddingRight: '20px' }}
												>
													{review.rating} STARS
												</StyledTableCell>
												<StyledTableCell
													align='right'
													style={{ paddingRight: '20px' }}
												>
													{review.createdAt.substring(0, 10)}
												</StyledTableCell>
												<StyledTableCell
													align='right'
													style={{ paddingRight: '20px' }}
												>
													<IconButton
														sx={{
															color: palette.blue.main,
															'&:hover': {
																color: palette.blue.light,
															},
														}}
														onClick={() => updateReviewHandler(review._id)}
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
