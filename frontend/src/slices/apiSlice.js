import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
// import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// need to customize the baseQuery to be able to intercept any 401 responses

// RTK Query = Easy to fetch data and cache tool
// This is the parent API not write logics
export const apiSlice = createApi({
	baseQuery: baseQuery,
	tagTypes: ['Items', 'Order', 'User'],
	endpoints: (builder) => ({}),
});
