import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function deleteCloudinaryRoute() {
	const router = express.Router();

	router.post('/', async (req, res) => {
		const { public_id } = req.body;

		try {
			const result = await cloudinary.uploader.destroy(public_id);

			if (result.result !== 'ok') {
				return res.status(400).json({ message: 'Failed to delete image' });
			}

			res.status(200).json({ message: 'Image deleted successfully' });
		} catch (error) {
			console.error('Image deletion error:', error);
			res.status(500).json({ message: 'Server error during image deletion' });
		}
	});
	return router;
}
