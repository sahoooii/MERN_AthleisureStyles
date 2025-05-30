import Cookies from 'js-cookie';
import { USERS_URL, PROFILE_UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';
import { loginSuccess } from './authSlice';

// injectEndpoints = for separate each endpoints
// For server functionality
export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
			async onQueryStarted(args, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;

					// JWT を Cookies に保存 (secure & sameSite 設定を適切に)
					Cookies.set('jwt', data.token, {
						expires: 7, // For seven days
						secure: true,
						sameSite: 'None',
						domain: '',
					});
				} catch (err) {
					console.error('Login failed:', err);
				}
			},
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
			async onQueryStarted(args, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;

					Cookies.set('jwt', data.token, {
						expires: 7,
						secure: true,
						sameSite: 'None',
					});

					Cookies.set('userInfo', JSON.stringify(data), {
						secure: true,
						sameSite: 'None',
					});

					// Reduxにも保存
					dispatch(loginSuccess(data));
				} catch (err) {
					console.error('Register failed:', err);
				}
			},
		}),
		uploadProfileImage: builder.mutation({
			query: (data) => ({
				url: `${PROFILE_UPLOAD_URL}`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
		}),
		deleteImage: builder.mutation({
			query: (data) => ({
				url: '/api/delete-image',
				method: 'POST',
				body: data,
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}),
		}),
		getProfileDetails: builder.query({
			query: () => ({
				url: `${USERS_URL}/profile`,
				method: 'GET',
				credentials: 'include',
			}),
			providesTags: ['Users'],
			keepUnusedDataFor: 5,
		}),
		getUserWishlist: builder.query({
			query: ({ pageNumber }) => ({
				url: `${USERS_URL}/wishlist`,
				method: 'GET',
				credentials: 'include',
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
				credentials: 'include',
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
				credentials: 'include',
			}),
		}),
		// Admin
		getUsers: builder.query({
			query: ({ pageNumber }) => ({
				url: USERS_URL,
				method: 'GET',
				credentials: 'include',
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
				credentials: 'include',
			}),
		}),
		getUserDetails: builder.query({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'GET',
				credentials: 'include',
			}),
			keepUnusedDataFor: 5,
		}),
		updateUserProfile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data.userId}`,
				method: 'PUT',
				body: data,
				credentials: 'include',
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useUploadProfileImageMutation,
	useDeleteImageMutation,
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
