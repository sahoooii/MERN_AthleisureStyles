export const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
	// Calculate the items price(total price without any fee) in whole number to avoid issues with
	// floating point number calculations
	const itemsPrice = state.cartItems.reduce(
		(acc, item) => acc + (item.price * 100 * item.quantity) / 100,
		0
	);
	state.itemsPrice = addDecimals(itemsPrice);

	// Calculate shipping price
	// If order is over $100 then free, else $10
	const shippingPrice = itemsPrice > 100 ? 0 : 10;
	state.shippingPrice = addDecimals(shippingPrice);

	// Calculate tax price(15% Tax)
	const taxPrice = 0.15 * itemsPrice;
	state.taxPrice = addDecimals(taxPrice);

	// Calculate total price
	const totalPrice = itemsPrice + shippingPrice + taxPrice;
	state.totalPrice = addDecimals(totalPrice);

	localStorage.setItem('cart', JSON.stringify(state));

	return state;
};
