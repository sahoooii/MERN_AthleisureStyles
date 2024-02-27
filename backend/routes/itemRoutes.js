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
	getTopRatedItems,
	getMostReviewedItems,
	getCategoryOfJacket,
	getCategoryOfTop,
	getCategoryOfBottom,
	getCategoryOfCap,
	getCategoryOfAccessories,
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getItems).post(protect, admin, createItem);
router.route('/toprated').get(getTopRatedItems);
router.route('/mostreviewed').get(getMostReviewedItems);

router.route('/jackets').get(getCategoryOfJacket);
router.route('/tops').get(getCategoryOfTop);
router.route('/bottoms').get(getCategoryOfBottom);
router.route('/caps').get(getCategoryOfCap);
router.route('/accessories').get(getCategoryOfAccessories);

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
