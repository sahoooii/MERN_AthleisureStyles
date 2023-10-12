import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Item from '../models/itemModel.js';

const router = express.Router();

// Get all items
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const items = await Item.find({});
		res.json(items);
	})
);

// Get Single item
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const item = await Item.findById(req.params.id);

		if (item) {
			return res.json(item);
		}
		res.status(404);
		throw new Error('Item not Found');
	})
);

export default router;
