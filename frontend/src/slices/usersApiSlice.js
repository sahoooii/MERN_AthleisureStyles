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
				url: `${USERS_URL}/userId`,
				method: 'DELETE',
			}),
		}),
		// Admin
		getUsers: builder.query({
			query: () => ({
				url: USERS_URL,
				method: 'GET',
			}),
			providesTags: ['Users'],
			keepUnusedDataFor: 5,
		}),
		deleteUserByAdmin: builder.mutation({
			query: (userId) => ({
				url: `${USERS_URL}/userId`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useUploadProfileImageMutation,
	useGetProfileDetailsQuery,
	useUpdateProfileMutation,
	useLogoutMutation,
	useDeleteUserMutation,
	useGetUsersQuery,
	useDeleteUserByAdminMutation,
} = usersApiSlice;
