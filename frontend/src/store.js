import { configureStore } from '@reduxjs/toolkit';
import { apiSLice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';

const store = configureStore({
	reducer: {
		[apiSLice.reducerPath]: apiSLice.reducer,
		cart: cartSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSLice.middleware),
	devTools: true,
});

export default store;
