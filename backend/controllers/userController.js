import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
	res.send('Auth user');
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	// picturePath
	res.send('Register user');
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
	res.send('Logout user');
});

// wishList

// @desc Get user profile
// @route GET /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
	res.send('User profile');
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Public
const updateUserProfile = asyncHandler(async (req, res) => {
	res.send('User profile');
});
