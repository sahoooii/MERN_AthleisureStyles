import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDERS_URL,
				method: 'POST',
				credentials: 'include',
				body: { ...order },
			}),
		}),
		getOrderDetails: builder.query({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}`,
				method: 'GET',
				credentials: 'include',
			}),
			keepUnusedDataFor: 5,
		}),
		deleteMyOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}`,
				method: 'DELETE',
				credentials: 'include',
			}),
		}),
		payOrder: builder.mutation({
			query: ({ orderId, details }) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: 'PUT',
				credentials: 'include',
				body: { ...details },
			}),
		}),
		getPayPalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
				method: 'GET',
				credentials: 'include',
			}),
			keepUnusedDataFor: 5,
		}),
		getMyOrders: builder.query({
			query: ({ pageNumber }) => ({
				url: `${ORDERS_URL}/orderhistory`,
				method: 'GET',
				credentials: 'include',
				params: {
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
		}),
		getNotPaidOrders: builder.query({
			query: ({ pageNumber }) => ({
				url: `${ORDERS_URL}/notpaidorders`,
				method: 'GET',
				credentials: 'include',
				params: {
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
		}),
		getOrders: builder.query({
			query: ({ pageNumber }) => ({
				url: ORDERS_URL,
				method: 'GET',
				credentials: 'include',
				params: {
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
		}),
		deliverOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}/deliver`,
				method: 'PUT',
				credentials: 'include',
			}),
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	useDeleteMyOrderMutation,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
	useGetMyOrdersQuery,
	useGetNotPaidOrdersQuery,
	useGetOrdersQuery,
	useDeliverOrderMutation,
} = ordersApiSlice;
