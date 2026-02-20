import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Item from '../models/itemModel.js';
import { calcPrices } from '../utils/calcPrices.js';
import { checkIfNewTransaction, verifyPayPalPayment } from '../utils/paypal.js';
import mongoose from 'mongoose';

// @desc Create New Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, billingAddress, paymentMethod } =
		req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No Order Items');
	} else {
		// get the ordered items from DB
		const itemsFromDB = await Item.find({
			_id: { $in: orderItems.map((item) => item._id) },
		});

		// map over the order items and use the price from DB
		const dbOrderItems = orderItems.map((itemFromClient) => {
			const matchingItemFromDb = itemsFromDB.find(
				(itemFromDB) => itemFromDB._id.toString() === itemFromClient._id,
			);
			return {
				...itemFromClient,
				item: itemFromClient._id,
				price: matchingItemFromDb.price,
				_id: undefined,
			};
		});

		// calculate prices
		const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
			calcPrices(dbOrderItems);

		const order = new Order({
			orderItems: dbOrderItems,
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

// @desc Delete orders when not paid
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
	const pageSize = 6;
	const page = Number(req.query.pageNumber) || 1;
	const totalOrdersCount = await Order.find({
		user: req.user._id,
		isPaid: true,
	}).countDocuments();

	// look for logged in user orders
	const orders = await Order.find({ user: req.user._id, isPaid: true })
		.sort({ createdAt: -1 })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res
		.status(200)
		.json({ orders, page, pages: Math.ceil(totalOrdersCount / pageSize) });
});

// @desc Get logged in user orders history
// @route GET /api/orders/notpaidorders
// @access Private
const getNotPaidOrders = asyncHandler(async (req, res) => {
	const pageSize = 6;
	const page = Number(req.query.pageNumber) || 1;
	const totalOrdersCount = await Order.find({
		user: req.user._id,
		isPaid: false,
	}).countDocuments();

	// look for logged in user orders
	const orders = await Order.find({ user: req.user._id, isPaid: false })
		.sort({ createdAt: -1 })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res
		.status(200)
		.json({ orders, page, pages: Math.ceil(totalOrdersCount / pageSize) });
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	// NOTE: here need to verify the payment was made to PayPal before marking
	// the order as paid
	const { verified, value } = await verifyPayPalPayment(req.body.id);
	if (!verified) throw new Error('Payment not verified');

	// Check if this transaction has been used before
	const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
	if (!isNewTransaction) throw new Error('Transaction has been used before');

	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error('Order not Found');
	}

	// Check the correct amount was paid
	const paidCorrectAmount = order.totalPrice.toString() === value;
	if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

	// Transaction
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// Update count in stock
		for (const item of order.orderItems) {
			const updatedProduct = await Item.findOneAndUpdate(
				{
					_id: item.item,
					countInStock: { $gte: item.quantity },
				},
				{
					$inc: { countInStock: -item.quantity },
				},
				{ session },
			);

			if (!updatedProduct) {
				throw new Error('Insufficient stock');
			}
		}

		// If successful, update order
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			// Comes from PayPal
			email_address: req.body.payer.email_address,
		};

		await order.save({ session });

		// 全部成功したら確定
		await session.commitTransaction();
		session.endSession();

		res.status(200).json(order);
	} catch (error) {
		// どれか失敗したら全部巻き戻し
		await session.abortTransaction();
		session.endSession();
		throw error;
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
		'firstName lastName email',
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
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;
	const totalOrdersCount = await Order.countDocuments();

	// Get all orders and get id and user name from user collection
	const orders = await Order.find({})
		.populate('user', 'id firstName lastName')
		.sort({ createdAt: -1 })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res
		.status(200)
		.json({ orders, page, pages: Math.ceil(totalOrdersCount / pageSize) });
});

export {
	addOrderItems,
	deleteMyOrder,
	getMyOrders,
	getNotPaidOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
};
