import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../constants';
import { logout } from './authSlice';
import Cookies from 'js-cookie';

const BASE_URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000' // 開発環境ではローカルサーバーを使用
		: API_URL; // 本番環境ではデプロイ済みのバックエンドを使用

console.log('API URL:', BASE_URL);

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers) => {
		const userInfo = Cookies.get('userInfo')
			? JSON.parse(Cookies.get('userInfo'))
			: null;
		if (userInfo?.token) {
			headers.set('Authorization', `Bearer ${userInfo.token}`);
		}
		return headers;
	},
});

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
