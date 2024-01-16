import express from 'express';
import {
	getItems,
	getItemById,
	getItemsByAdmin,
	createItem,
	updateItem,
	deleteItem,
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getItems).post(protect, admin, createItem);
router.get('/itemslist', protect, admin, getItemsByAdmin);
router
	.route('/:id')
	.get(getItemById)
	.put(protect, admin, updateItem)
	.delete(protect, admin, deleteItem);

export default router;
