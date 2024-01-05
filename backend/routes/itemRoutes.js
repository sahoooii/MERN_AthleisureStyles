import express from 'express';
import {
	getItems,
	getItemById,
	createItem,
	updateItem,
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getItems).post(protect, admin, createItem);
router.route('/:id').get(getItemById).put(protect, admin, updateItem);

export default router;
