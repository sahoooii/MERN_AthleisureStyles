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
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useUploadProfileImageMutation,
	useUpdateProfileMutation,
	useLogoutMutation,
} = usersApiSlice;
