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
	getItemReviews,
	addToWishList,
	updateItemReviewByAdmin,
	getItemDetailsByAdmin,
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getItems).post(protect, admin, createItem);
router.route('/:id/wishlist').put(protect, addToWishList);
router.route('/itemslist').get(protect, admin, getItemsByAdmin);
router
	.route('/:id')
	.get(getItemById)
	.put(protect, admin, updateItem)
	.delete(protect, admin, deleteItem);
router.route('/:id/admin').get(protect, admin, getItemDetailsByAdmin);
router
	.route('/:id/reviews')
	.post(protect, createItemReview)
	.delete(protect, deleteItemReview);
router
	.route('/:id/admin/reviews')
	.get(protect, admin, getItemReviews)
	.put(protect, admin, updateItemReviewByAdmin);

export default router;
