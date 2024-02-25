import { ITEMS_URL, ITEM_UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

// injectEndpoints = for separate each endpoints
export const itemsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getItems: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: ITEMS_URL,
				method: 'GET',
				params: {
					keyword,
					pageNumber,
				},
			}),
			providesTags: ['Items'],
			keepUnusedDataFor: 5,
		}),
		getItemDetails: builder.query({
			query: ({ itemId, pageNumber }) => ({
				url: `${ITEMS_URL}/${itemId}`,
				method: 'GET',
				params: {
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
		}),
		getItemsByAdmin: builder.query({
			query: ({ pageNumber }) => ({
				url: `${ITEMS_URL}/itemslist`,
				params: {
					pageNumber,
				},
			}),
			providesTags: ['Items'],
			keepUnusedDataFor: 5,
		}),
		getItemDetailsByAdmin: builder.query({
			query: (itemId) => ({
				url: `${ITEMS_URL}/${itemId}/admin`,
				method: 'GET',
			}),
			providesTags: ['Items'],
			keepUnusedDataFor: 5,
		}),
		createItem: builder.mutation({
			query: (data) => ({
				url: `${ITEMS_URL}`,
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
			// invalidatesTags: ['Items'],
		}),
		addToWishList: builder.mutation({
			query: (data) => ({
				url: `${ITEMS_URL}/${data.itemId}/wishlist`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Users'],
		}),
		createReview: builder.mutation({
			query: (data) => ({
				url: `${ITEMS_URL}/${data.itemId}/reviews`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Items'],
		}),
		deleteReview: builder.mutation({
			query: (itemId) => ({
				url: `${ITEMS_URL}/${itemId}/reviews`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Items'],
		}),
		getReviewsByAdmin: builder.query({
			query: ({ itemId, pageNumber }) => ({
				url: `${ITEMS_URL}/${itemId}/admin/reviews`,
				method: 'GET',
				params: {
					pageNumber,
				},
			}),
			providesTags: ['Items'],
			keepUnusedDataFor: 5,
		}),
		updateReviewByAdmin: builder.mutation({
			query: (data) => ({
				url: `${ITEMS_URL}/${data.itemId}/admin/reviews`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Items'],
		}),
		getTopRatedItems: builder.query({
			query: () => ({
				url: `${ITEMS_URL}/toprated`,
				method: 'GET',
			}),
			keepUnusedDataFor: 5,
		}),
		getMostReviewedItems: builder.query({
			query: () => ({
				url: `${ITEMS_URL}/mostreviewed`,
				method: 'GET',
			}),
			keepUnusedDataFor: 5,
		}),
		// Categories
		getCategoryOfJacket: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: `${ITEMS_URL}/jackets`,
				method: 'GET',
				params: {
					keyword,
					pageNumber,
				},
			}),
			// providesTags: ['Items'],
			keepUnusedDataFor: 5,
		}),
		getCategoryOfTop: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: `${ITEMS_URL}/tops`,
				method: 'GET',
				params: {
					keyword,
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
		}),
		getCategoryOfBottom: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: `${ITEMS_URL}/bottoms`,
				method: 'GET',
				params: {
					keyword,
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
		}),
		getCategoryOfCap: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: `${ITEMS_URL}/caps`,
				method: 'GET',
				params: {
					keyword,
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
		}),
		getCategoryOfAccessory: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: `${ITEMS_URL}/accessories`,
				method: 'GET',
				params: {
					keyword,
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
		}),
	}),
});

export const {
	useGetItemsQuery,
	useGetItemDetailsQuery,
	useGetItemsByAdminQuery,
	useGetItemDetailsByAdminQuery,
	useCreateItemMutation,
	useUpdateItemMutation,
	useUploadItemImagMutation,
	useDeleteItemMutation,
	useAddToWishListMutation,
	useCreateReviewMutation,
	useDeleteReviewMutation,
	useGetReviewsByAdminQuery,
	useUpdateReviewByAdminMutation,
	useGetTopRatedItemsQuery,
	useGetMostReviewedItemsQuery,
	useGetCategoryOfJacketQuery,
	useGetCategoryOfTopQuery,
	useGetCategoryOfBottomQuery,
	useGetCategoryOfCapQuery,
	useGetCategoryOfAccessoryQuery,
} = itemsApiSlice;
