import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

// need to customize the baseQuery to be able to intercept any 401 responses
async function baseQueryWithAuth(args, api, extra) {
	const result = await baseQuery(args, api, extra);

	// Dispatch the logout action on 401.
	if (result.error && result.status === 401) {
		api.dispatch(logout());
	}
	return result;
}

// RTK Query = Easy to fetch data and cache tool
// This is the parent API not write logics
export const apiSlice = createApi({
	baseQuery: baseQueryWithAuth, // Use the customized baseQuery
	tagTypes: ['Items', 'Order', 'User'],
	endpoints: (builder) => ({}),
});
