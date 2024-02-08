import { USERS_URL, PROFILE_UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

// injectEndpoints = for separate each endpoints
// For server functionality
export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: data,
			}),
		}),
		uploadProfileImage: builder.mutation({
			query: (data) => ({
				url: `${PROFILE_UPLOAD_URL}`,
				method: 'POST',
				body: data,
			}),
		}),
		getProfileDetails: builder.query({
			query: () => ({
				url: `${USERS_URL}/profile`,
				method: 'GET',
			}),
			providesTags: ['Users'],
			keepUnusedDataFor: 5,
		}),
		getUserWishlist: builder.query({
			query: ({ pageNumber }) => ({
				url: `${USERS_URL}/wishlist`,
				method: 'GET',
				params: {
					pageNumber,
				},
			}),
			providesTags: ['Users'],
			keepUnusedDataFor: 5,
		}),
		updateProfile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		deleteUser: builder.mutation({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'DELETE',
			}),
		}),
		// Admin
		getUsers: builder.query({
			query: ({ pageNumber }) => ({
				url: USERS_URL,
				method: 'GET',
				params: {
					pageNumber,
				},
			}),
			providesTags: ['Users'],
			keepUnusedDataFor: 5,
		}),
		deleteUserByAdmin: builder.mutation({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'DELETE',
			}),
		}),
		getUserDetails: builder.query({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'GET',
			}),
			keepUnusedDataFor: 5,
		}),
		updateUserProfile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.userId}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useUploadProfileImageMutation,
	useGetProfileDetailsQuery,
	useGetUserWishlistQuery,
	useUpdateProfileMutation,
	useLogoutMutation,
	useGetUsersQuery,
	useDeleteUserMutation,
	useDeleteUserByAdminMutation,
	useGetUserDetailsQuery,
	useUpdateUserProfileMutation,
} = usersApiSlice;
