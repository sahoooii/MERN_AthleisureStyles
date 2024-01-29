import express from 'express';
import {
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
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// getUsers=admin
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
// router.put('/wishlist', protect, addToWishList);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route('/:id')
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)
	.delete(protect, deleteUser)
	.delete(protect, admin, deleteUserByAdmin);

export default router;
