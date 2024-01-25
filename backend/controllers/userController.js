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
			picturePath: user.picturePath,
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
		user.picturePath = req.body.picturePath || user.picturePath;
		user.isAdmin = req.body.isAdmin || user.isAdmin;
		user.wishlist = req.body.wishlist || user.wishlist;

		// Password was hashed, that's why separated
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
			isAdmin: updatedUser.isAdmin,
			wishlist: updatedUser.wishlist,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		// Admin user can't delete
		if (user.isAdmin) {
			res.status(400);
			throw new Error('Can not Delete Admin User');
		}
		await User.deleteOne({ _id: user._id });

		res.status(200).json({ message: 'User Deleted' });
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
	const users = await User.find({});

	res.status(200).json(users);
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.isAdmin = Boolean(req.body.isAdmin);
		user.email = req.body.email || user.email;
		user.picturePath = req.body.picturePath || user.picturePath;
		user.wishlist = req.body.wishlist || user.wishlist;

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			isAdmin: updatedUser.isAdmin,
			email: updatedUser.email,
			picturePath: updatedUser.picturePath,
			wishlist: updatedUser.wishlist,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}

	res.send('Updated user by Admin');
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUserByAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		// Admin user can't delete
		if (user.isAdmin) {
			res.status(400);
			throw new Error('Can not Delete Admin User');
		}
		await User.deleteOne({ _id: user._id });

		res.status(200).json({ message: 'User Deleted' });
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// delete user own account

export {
	loginUser,
	registerUser,
	logoutUser,
	// addToWishList,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	deleteUserByAdmin,
};
