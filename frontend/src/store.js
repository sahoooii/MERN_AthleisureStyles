import { configureStore } from '@reduxjs/toolkit';
import { apiSLice } from './slices/apiSlice';

const store = configureStore({
	reducer: {
		[apiSLice.reducerPath]: apiSLice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSLice.middleware),
	devTools: true,
});

export default store;
