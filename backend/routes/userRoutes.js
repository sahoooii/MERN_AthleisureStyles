import express from 'express';
import {
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
} from '../controllers/userController.js';

const router = express.Router();

// getUsers=admin
router.route('/').post(registerUser).get(getUsers);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
router.post('/wishlist', addToWishList);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default router;
