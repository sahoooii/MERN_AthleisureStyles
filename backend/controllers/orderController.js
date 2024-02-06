import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Item from '../models/itemModel.js';

// @desc Create New Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		billingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No Order Items');
	} else {
		const order = new Order({
			orderItems: orderItems.map((order) => ({
				...order,
				item: order._id,
				_id: undefined,
			})),
			user: req.user._id,
			shippingAddress,
			billingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @desc Delete orders when nor paid
// @route GET /api/orders/:id
// @access Private
const deleteMyOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		await Order.deleteOne({ _id: order._id });

		res.status(200).json({ message: 'Your order was deleted' });
	} else {
		res.status(404);
		throw new Error('Your order not found');
	}
});

// @desc Get logged in user orders history
// @route GET /api/orders/orderhistory
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
	const pageSize = 4;
	const page = Number(req.query.pageNumber) || 1;
	const totalOrdersCount = await Order.find({
		user: req.user._id,
		isPaid: true,
	}).countDocuments();
	// console.log('ordersCount:', totalOrdersCount);

	// look for logged in user orders
	const orders = await Order.find({ user: req.user._id, isPaid: true })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ orders, page, pages: Math.ceil(totalOrdersCount / pageSize) });
	// console.log('orders:', orders);
	res.status(200).json(orders);
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = new Date();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			// comes from PayPal
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		// Update countInStock
		for (const index in updatedOrder.orderItems) {
			const item = updatedOrder.orderItems[index];
			// console.log('Item - ', item);
			const product = await Item.findById(item.item);
			// console.log('Product - ', product);
			product.countInStock -= item.quantity;
			// console.log('updatedQty - ', product.countInStock);
			product.save();
		}

		res.status(200).json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not Found');
	}
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = new Date();

		const updatedOrder = await order.save();

		res.status(200).json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not Found');
	}
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
	// get name and email from user collection
	const order = await Order.findById(req.params.id).populate(
		'user',
		'firstName lastName email'
	);

	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404);

		throw new Error('Order Not Found');
	}
});

// @descGet All Orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	const pageSize = 7;
	const page = Number(req.query.pageNumber) || 1;
	const totalOrdersCount = await Order.countDocuments();

	// Get all orders and get id and user name from user collection
	const orders = await Order.find({})
		.populate('user', 'id firstName lastName')
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	// console.log('orders', orders);

	res
		.status(200)
		.json({ orders, page, pages: Math.ceil(totalOrdersCount / pageSize) });
});

export {
	addOrderItems,
	deleteMyOrder,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
};
