import asyncHandler from '../middleware/asyncHandler.js';
import Item from '../models/itemModel.js';
import User from '../models/userModel.js';

// @desc Fetch All Items
// @route GET /api/items
// @access Public
const getItems = asyncHandler(async (req, res) => {
	const pageSize = 6;
	const page = Number(req.query.pageNumber) || 1;
	const totalItemsCount = await Item.countDocuments();

	const items = await Item.find({})
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ items, page, pages: Math.ceil(totalItemsCount / pageSize) });
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
	const pageSize = 4;
	const page = Number(req.query.pageNumber) || 1;
	const totalItemsCount = await Item.countDocuments();

	const items = await Item.find({})
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	// console.log('items:', items);

	res.json({ items, page, pages: Math.ceil(totalItemsCount / pageSize) });
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

// @desc  User wishList
// @route PUT /api/items/:id/wishlist
// @access Private
const addToWishList = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	const { _id: userId } = user;
	const { itemId } = req.body;
	const item = await Item.findById(itemId);
	// console.log('item:', item);
	// From here
	const pageSize = 2;
	const page = Number(req.query.pageNumber) || 1;
	const totalWishlistCount = user.wishlist.length;

	const paginateUser = await User.aggregate([
		{
			$match: { _id: req.user._id },
		},
		{ $unwind: '$wishlist' },
		{ $limit: 2 },
	]).skip(pageSize * (page - 1));

	console.log('list', paginateUser);
	// end

	try {
		const alreadyAdded = user.wishlist.find(
			(list) => list._id.toString() === itemId
		);
		// console.log('alreadyAdded:', alreadyAdded);

		if (alreadyAdded) {
			let user = await User.findByIdAndUpdate(
				userId,
				{
					$pull: { wishlist: alreadyAdded },
				},
				{
					new: true,
				}
			);

			// res.status(200).json({ user });
			res.status(200).json({
				user,
				paginateUser,
				page,
				pages: Math.ceil(totalWishlistCount / pageSize),
			});
		} else {
			let user = await User.findByIdAndUpdate(
				userId,
				{
					$push: { wishlist: item },
				},
				{
					new: true,
				}
			);

			// res.status(200).json({ user });
			res.status(200).json({
				user,
				paginateUser,
				page,
				pages: Math.ceil(totalWishlistCount / pageSize),
			});
		}
	} catch (error) {
		res.status(400);
		throw new Error('Failed to add to wishlist');
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
		item.rating = (
			item.reviews.reduce((acc, item) => acc + item.rating, 0) /
			item.reviews.length
		).toFixed(1);

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
				(
					item.reviews.reduce((acc, item) => acc + item.rating, 0) /
					item.reviews.length
				).toFixed(1);

			await item.save();

			res.status(200).json({ message: 'Review Deleted Successfully' });
		} else {
			res.status(401);
			throw new Error("You can't delete other user's review");
		}
	} else {
		res.status(404);
		throw new Error('No Reviews');
	}
});

// @desc GET item reviews
// @route DELETE /api/items/:id/admin/reviews
// @access Private/admin
const getItemReviews = asyncHandler(async (req, res) => {
	const getItem = await Item.findById(req.params.id);
	const reviews = getItem.reviews;
	// console.log('item:', item);

	const pageSize = 2;
	const page = Number(req.query.pageNumber) || 1;
	const totalReviewCount = reviews.length;

	const item = await Item.aggregate([
		{
			$match: { _id: getItem._id },
		},
		{ $unwind: '$reviews' },
		{ $skip: pageSize * (page - 1) },
		{ $limit: 2 },
	]);

	console.log('item', item);

	if (reviews) {
		// return res.json(item);
		return res.json({
			getItem,
			item,
			page,
			pages: Math.ceil(totalReviewCount / pageSize),
		});
	} else {
		res.status(404);
		throw new Error('Review Not Found');
	}

	// const item = await Item.find(
	// 	{
	// 		_id: req.params.id,
	// 	},
	// 	{ reviews: { $slice: 2 } }
	// ).skip(pageSize * (page - 1));

	// const review = await Item.findById(req.params.id, 'reviews');
});

// @desc Update item reviews By admin
// @route PUT /api/items/:id/admin/reviews
// @access Private/admin
const updateItemReviewByAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	// const { isAdmin } = user;

	const { reviewId } = req.body;

	const item = await Item.findById(req.params.id);
	const { _id: itemId } = item;

	const reviews = item.reviews;

	try {
		const deleteReview = reviews.find(
			(review) => review._id.toString() === reviewId
		);

		// console.log('deleteReviewId:', deleteReview);

		if (user.isAdmin) {
			let item = await Item.findByIdAndUpdate(
				itemId,
				{
					$pull: { reviews: deleteReview },
				},
				{
					new: true,
				}
			);

			item.numReviews = item.reviews.length;

			item.rating =
				item.reviews.length > 0 &&
				(
					item.reviews.reduce((acc, item) => acc + item.rating, 0) /
					item.reviews.length
				).toFixed(1);

			await item.save();

			res.status(200).json({ item });
		} else {
			res.status(401);
			throw new Error('OnlyAdmin User');
		}
	} catch (error) {
		res.status(400);
		throw new Error('Failed to delete this Review');
	}
});

export {
	getItems,
	getItemById,
	getItemsByAdmin,
	createItem,
	updateItem,
	deleteItem,
	addToWishList,
	createItemReview,
	deleteItemReview,
	getItemReviews,
	updateItemReviewByAdmin,
};
