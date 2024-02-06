import express from 'express';
import {
	addOrderItems,
	deleteMyOrder,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
	getNotPaidOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/orderhistory').get(protect, getMyOrders);
router.route('/notpaidorders').get(protect, getNotPaidOrders);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id').get(protect, getOrderById).delete(protect, deleteMyOrder);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
