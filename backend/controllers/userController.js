import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// check user
	const user = await User.findOne({ email: email });
	// user exist check
	if (user && (await user.matchPassword(password))) {
		// Create token
		generateToken(res, user._id);

		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error('Invalid Email or Password');
	}
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, picturePath } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('You have already registered');
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
		picturePath,
	});

	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			picturePath: user.picturePath,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: 'Successfully Logged Out' });
});

// @desc  User wishList
// @route POST /api/users/wishlist
// @access Private
const addToWishList = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	const { _id } = user;
	const { itemId } = req.body;

	if (user) {
		try {
			const alreadyAdded = user.wishlist.find((id) => id.toString() === itemId);
			if (alreadyAdded) {
				let user = await User.findByIdAndUpdate(
					_id,
					{
						$pull: { wishlist: itemId },
					},
					{
						new: true,
					}
				);
				res.status(200).json(user);
			} else {
				let user = await User.findByIdAndUpdate(
					_id,
					{
						$push: { wishlist: itemId },
					},
					{
						new: true,
					}
				);
				res.status(200).json(user);
			}
		} catch (error) {
			res.status(400);
			throw new Error('Failed to add to wishlist');
		}
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			picturePath: user.picturePath,
			wishlist: user.wishlist,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @desc Get user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	// Only update updated field
	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.email = req.body.email || user.email;
		user.picturePath = req.body.picturePath || user.picturePath;
		user.wishlist = req.body.wishlist || user.wishlist;

		// Password was hashed, that's wht separated
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			email: updatedUser.email,
			picturePath: updatedUser.picturePath,
			wishlist: updatedUser.wishlist,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @Admin

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	res.send('Get users by Admin');
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	res.send('Get user by ID Admin');
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	res.send('Update user by Admin');
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	res.send('Delete user by Admin');
});

export {
	loginUser,
	registerUser,
	logoutUser,
	addToWishList,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
};
