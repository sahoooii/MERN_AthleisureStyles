import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: { cartItems: [] };

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			// Add to new item to the cart
			const item = action.payload;
			// If item already in the cart
			const existItem = state.cartItems.find(
				(cartItem) => cartItem._id === item._id
			);
			// Update quantity
			if (existItem) {
				state.cartItems = state.cartItems.map((cartItem) =>
					cartItem._id === existItem._id ? item : cartItem
				);
			} else {
				state.cartItems = [...state.cartItems, item];
			}
			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(cartItem) => cartItem._id !== action.payload
			);

			return updateCart(state);
		},
		resetCart: (state) => (state = initialState),
	},
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
