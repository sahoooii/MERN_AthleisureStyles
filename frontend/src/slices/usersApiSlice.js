import { USERS_URL } from '../constants';
import { apiSLice } from './apiSlice';

// injectEndpoints = for separate each endpoints
export const usersApiSlice = apiSLice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useLoginMutation } = usersApiSlice;
