import multer from 'multer';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary 設定
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function createCloudinaryUploadRoute(folderName, fieldName) {
	const router = express.Router();

	const storage = new CloudinaryStorage({
		cloudinary,
		params: {
			folder: `athleisure-styles/${folderName}`,
			format: async () => 'webp',
			public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
		},
	});

	const fileFilter = (req, file, cb) => {
		const fileTypes = /jpe?g|png|webp/;
		const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

		const extensionName = fileTypes.test(file.originalname.toLowerCase());
		const mimeType = mimeTypes.test(file.mimetype);

		if (extensionName && mimeType) {
			cb(null, true);
		} else {
			cb(new Error('Upload images only!'), false);
		}
	};

	const upload = multer({
		storage,
		fileFilter,
		limits: { fileSize: 2000000 },
	});

	const uploadSingleImage = upload.single(fieldName);

	router.post('/', uploadSingleImage, (req, res) => {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' });
		}

		// console.log('uploaded image path:', req.file?.path);
		console.log('req.file:', req.file);

		res.status(200).send({
			message: 'Image uploaded successfully',
			image: req.file?.path,
		});
	});

	return router;
}
