import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// RTK Query = Easy to fetch data and cache tool
// This is the parent API not write logics
export const apiSLice = createApi({
	baseQuery: baseQuery,
	tagTypes: ['Items', 'Order', 'User'],
	endpoints: (builder) => ({}),
});
