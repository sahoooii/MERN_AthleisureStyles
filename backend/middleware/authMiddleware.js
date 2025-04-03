import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Make sure you have a cookie or not
// Protect Routes
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Read JWT from the cookie the name is 'jwt'
	token = req.cookies.jwt;
	console.log('cookies:', req.cookies.jwt);

	if (token) {
		try {
			// Decode the token to get userID
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// Add request object to access all of routes and data easily
			// Get userId from DB except password
			const userId = new mongoose.Types.ObjectId(decoded.userId);
			// req.user = await User.findById(decoded.userId).select('-password');
			req.user = await User.findById(userId).select('-password');

			if (!req.user) {
				res.status(401);
				throw new Error('Not authorized, user not found');
			}

			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	} else {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

// Admin middleware
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as Admin');
	}
};

export { protect, admin };
