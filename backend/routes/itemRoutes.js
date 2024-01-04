import express from 'express';
import {
	getItems,
	getItemById,
	createItem,
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getItems).post(protect, admin, createItem);
router.route('/:id').get(getItemById);

export default router;
