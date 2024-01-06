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
	const { name, price, image, brand, category, countInStock, description } =
		req.body;

	const item = await Item.findById(req.params.id);
	
	// Only update updated field
	if (item) {
		item.name = name || item.name;
		item.price = price || item.price;
		item.image = image || item.image;
		item.brand = brand || item.brand;
		item.category = category || item.category;
		item.countInStock = countInStock || item.countInStock;
		item.description = description || item.description;

		const updatedItem = await item.save();

		res.status(200).json({
			_id: updatedItem._id,
			name: updatedItem.name,
			price: updatedItem.price,
			image: updatedItem.image,
			brand: updatedItem.brand,
			category: updatedItem.category,
			countInStock: updatedItem.countInStock,
			description: updatedItem.description,
		});
	} else {
		res.status(404);
		throw new Error('Item Not Found');
	}

	// if (item) {
	// 	item.name = name;
	// 	item.price = price;
	// 	item.image = image;
	// 	item.brand = brand;
	// 	item.category = category;
	// 	item.countInStock = countInStock;
	// 	item.description = description;

	// 	const updatedItem = await Item.save();
	// 	res.status(201).json(updatedItem);
	// } else {
	// 	res.status(404);
	// 	throw new Error('Resource Not Found');
	// }
});

export { getItems, getItemById, createItem, updateItem };
