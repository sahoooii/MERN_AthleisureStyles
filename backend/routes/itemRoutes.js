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
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/').get(getItems).post(protect, admin, createItem);
router.route('/toprated').get(getTopRatedItems);
router.route('/mostreviewed').get(getMostReviewedItems);

router.route('/jackets').get(getCategoryOfJacket);
router.route('/tops').get(getCategoryOfTop);
router.route('/bottoms').get(getCategoryOfBottom);
router.route('/caps').get(getCategoryOfCap);
router.route('/accessories').get(getCategoryOfAccessories);

router.route('/:id/wishlist').put(protect, checkObjectId, addToWishList);
router.route('/itemslist').get(protect, admin, getItemsByAdmin);
router
	.route('/:id')
	.get(checkObjectId, getItemById)
	.put(protect, admin, checkObjectId, updateItem)
	.delete(protect, admin, checkObjectId, deleteItem);
router
	.route('/:id/admin')
	.get(protect, admin, checkObjectId, getItemDetailsByAdmin);
router
	.route('/:id/reviews')
	.post(protect, checkObjectId, createItemReview)
	.delete(protect, checkObjectId, deleteItemReview);
router
	.route('/:id/admin/reviews')
	.get(protect, admin, checkObjectId, getItemReviews)
	.put(protect, admin, checkObjectId, updateItemReviewByAdmin);

export default router;
