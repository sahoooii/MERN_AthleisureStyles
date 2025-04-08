const formatQuantity = (quantity, noun) => {
	return quantity === 1 ? `${quantity} ${noun}` : `${quantity} ${noun}s`;
};

export default formatQuantity;
