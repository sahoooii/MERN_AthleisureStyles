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
	}),
});

export const { useGetItemsQuery, useGetItemDetailsQuery } = itemsApiSlice;
