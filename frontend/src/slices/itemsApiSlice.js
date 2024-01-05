import { ITEMS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// injectEndpoints = for separate each endpoints
export const itemsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getItems: builder.query({
			query: () => ({
				url: ITEMS_URL,
			}),
			keepUnusedDataFor: 5,
		}),
		getItemDetails: builder.query({
			query: (itemId) => ({
				url: `${ITEMS_URL}/${itemId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createItem: builder.mutation({
			query: () => ({
				url: ITEMS_URL,
				method: 'POST',
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
	}),
});

export const {
	useGetItemsQuery,
	useGetItemDetailsQuery,
	useCreateItemMutation,
	useUpdateItemMutation,
} = itemsApiSlice;
