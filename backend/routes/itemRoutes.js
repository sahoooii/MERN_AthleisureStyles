import express from 'express';
import {
	getItems,
	getItemById,
	getItemsByAdmin,
	createItem,
	updateItem,
	deleteItem,
	createItemReview,
	deleteItemReview,
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getItems).post(protect, admin, createItem);
router.route('/itemslist').get(protect, admin, getItemsByAdmin);
router
	.route('/:id')
	.get(getItemById)
	.put(protect, admin, updateItem)
	.delete(protect, admin, deleteItem);
router
	.route('/:id/reviews')
	.post(protect, createItemReview)
	.delete(protect, deleteItemReview);

export default router;
