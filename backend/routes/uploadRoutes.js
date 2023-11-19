import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'profileUploads/');
	},
	filename(req, res, cb) {
		cb(
			null,
			`${file.fieldname}-${Dare.now()}${path.extname(file.originalname)}`
		);
	},
});

export default router;
