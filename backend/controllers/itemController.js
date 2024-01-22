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
		throw new Error('Item Not Found');
	}
});

// Admin
// @desc Fetch All Items
// @route GET /api/items/itemslist
// @access  Private/Admin
const getItemsByAdmin = asyncHandler(async (req, res) => {
	const items = await Item.find({});
	res.json(items);
});

// @desc Create a sample Item
// @route POST /api/items
// @access Private/Admin
const createItem = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		image,
		brand,
		category,
		description,
		countInStock,
		numReviews,
	} = req.body;

	const item = await Item.create({
		name,
		price,
		user: req.user._id,
		image,
		brand,
		category,
		description,
		countInStock,
		numReviews,
	});

	if (item) {
		res.status(201).json({
			_id: item._id,
			name: item.name,
			price: item.price,
			user: req.user._id,
			image: item.image,
			brand: item.brand,
			category: item.category,
			description: item.description,
			countInStock: item.countInStock,
			numReviews: item.numReviews,
		});
	} else {
		res.status(400);
		throw new Error('Invalid item data');
	}
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
});

// @desc DELETE a Item
// @route DELETE /api/items/:id
// @access Private/Admin
const deleteItem = asyncHandler(async (req, res) => {
	const item = await Item.findById(req.params.id);

	if (item) {
		await Item.deleteOne({ _id: item._id });

		res.status(200).json({ message: 'Item Deleted' });
	} else {
		res.status(404);
		throw new Error('Item Not Found');
	}
});

// @desc Review a Item
// @route POST /api/items/:id/review
// @access Private
const createItemReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const item = await Item.findById(req.params.id);

	// Only one review for a item,  each person
	if (item) {
		const alreadyReviewed = item.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('This Item already Reviewed');
		}

		// console.log(req.user);
		const review = {
			name: `${req.user.firstName} ${req.user.lastName} `,
			user: req.user._id,
			image: req.user.picturePath,
			isAdmin: req.user.isAdmin,
			rating: Number(rating),
			comment,
		};

		item.reviews.push(review);

		item.numReviews = item.reviews.length;

		// Average rate calculation
		// 3 4 1 / 3
		item.rating =
			item.reviews.reduce((acc, item) => acc + item.rating, 0) /
			item.reviews.length;

		await item.save();

		res.status(201).json({ message: 'Review added Successfully' });
	} else {
		res.status(404);
		throw new Error('Item Not Found');
	}
});

// @desc Delete item review
// @route DELETE /api/items/:id/reviews
// @access Private
const deleteItemReview = asyncHandler(async (req, res) => {
	const item = await Item.findById(req.params.id);
	const reviews = item.reviews;

	if (reviews) {
		// Check include user info in reviews array
		const userCheck = reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);
		// console.log('userCheck', userCheck);

		if (userCheck) {
			reviews.map((review) => {
				// console.log('review', review);
				//check the comment ID same person or not
				if (userCheck._id === review._id) {
					// console.log('review._id', review._id);
					review.deleteOne({ _id: review._id });
				}
			});

			item.numReviews = item.reviews.length;

			item.rating =
				item.reviews.length > 0 &&
				item.reviews.reduce((acc, item) => acc + item.rating, 0) /
					item.reviews.length;

			await item.save();

			res.status(201).json({ message: 'Review Deleted Successfully' });
		} else {
			res.status(404);
			throw new Error("You can't delete other user's review");
		}
	} else {
		res.status(404);
		throw new Error('No Reviews');
	}
});

// @desc GET item reviews
// @route GET /api/items/reviews
// @access Private/admin
const getItemReviews = asyncHandler(async (req, res) => {
	const items = await Item.findById(req.params._id);

	console.log(items);
	res.json(items);
});

export {
	getItems,
	getItemById,
	getItemsByAdmin,
	createItem,
	updateItem,
	deleteItem,
	createItemReview,
	deleteItemReview,
	getItemReviews,
};
