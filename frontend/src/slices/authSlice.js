import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
	userInfo: Cookies.get('userInfo')
		? JSON.parse(Cookies.get('userInfo'))
		: null,
	token: Cookies.get('jwt') || null, // Get JWT from Cookie
};

// For Cookies functionality
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.userInfo = action.payload;
			Cookies.set('userInfo', JSON.stringify(action.payload), {
				secure: true,
				sameSite: 'None',
			});
		},
		logout: (state) => {
			state.userInfo = null;
			state.token = null;
			localStorage.clear();
			Cookies.remove('userInfo');
			Cookies.remove('jwt'); // JWT も削除
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
