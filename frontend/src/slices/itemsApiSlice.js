import { ITEMS_URL, ITEM_UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

// injectEndpoints = for separate each endpoints
export const itemsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getItems: builder.query({
			query: () => ({
				url: ITEMS_URL,
			}),
			providesTags: ['Items'],
			keepUnusedDataFor: 5,
		}),
		getItemDetails: builder.query({
			query: (itemId) => ({
				url: `${ITEMS_URL}/${itemId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createItem: builder.mutation({
			query: (data) => ({
				url: ITEMS_URL,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Items'],
		}),
		updateItem: builder.mutation({
			query: (data) => ({
				url: `${ITEMS_URL}/${data._id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Items'],
		}),
		uploadItemImag: builder.mutation({
			query: (data) => ({
				url: ITEM_UPLOAD_URL,
				method: 'POST',
				body: data,
			}),
		}),
		deleteItem: builder.mutation({
			query: (itemId) => ({
				url: `${ITEMS_URL}/${itemId}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetItemsQuery,
	useGetItemDetailsQuery,
	useCreateItemMutation,
	useUpdateItemMutation,
	useUploadItemImagMutation,
	useDeleteItemMutation,
} = itemsApiSlice;
