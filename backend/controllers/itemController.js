import asyncHandler from '../middleware/asyncHandler.js';
import Item from '../models/itemModel.js';

// @desc Fetch All Items
// @route GET /api/items
// @access Public
const getItems = asyncHandler(async (req, res) => {
	const items = await Item.find({});
	res.json(items);
});

// @desc Fetch Single Item
// @route GET /api/items/:id
// @access Public
const getItemById = asyncHandler(async (req, res) => {
	const item = await Item.findById(req.params.id);

	if (item) {
		return res.json(item);
	} else {
		res.status(404);
		throw new Error('Item not Found');
	}
});

export { getItems, getItemById };
