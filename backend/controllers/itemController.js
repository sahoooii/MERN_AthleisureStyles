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
		throw new Error('Resource Not Found');
	}
});

// @desc Create a sample Item
// @route POST /api/items
// @access Private/Admin
const createItem = asyncHandler(async (req, res) => {
	const item = new Item({
		name: 'Sample Name',
		price: 0,
		user: req.user._id,
		image: '/images/sample-nike-shoes.jpg',
		brand: 'Sample Brand',
		category: 'Sample Category',
		description: 'Sample Description',
		countInStock: 0,
		numReviews: 0,
	});

	const createdItem = await item.save();

	res.status(201).json(createdItem);
});

// @desc Update a Item
// @route PUT /api/items/:id
// @access Private/Admin
const updateItem = asyncHandler(async (req, res) => {
	const items = await Item.find({});
	res.json(items);
});


export { getItems, getItemById, createItem, updateItem };
