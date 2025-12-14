import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { createCloudinaryUploadRoute } from './routes/cloudinaryUploadRoute.js';
import { deleteCloudinaryRoute } from './routes/deleteImage.js';

dotenv.config();
connectDB(); // Connect to Mongo DB
const PORT = process.env.PORT || 5000;

const app = express();

// Cookie parser middleware
// To allow to access cookie.request
app.use(cookieParser());

const allowedOrigins = [
	'http://localhost:3000',
	'https://athleisurestyles.onrender.com',
	'https://mern-athleisure-styles.vercel.app',
];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true, // Cookie を送受信できるようにする
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'], // 必要なヘッダーを許可
	})
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add profile image for cloudinary
app.use(
	'/api/profileupload',
	createCloudinaryUploadRoute('profileImage', 'picturePath')
);

// Delete image from cloudinary when register failed
app.use('/api/delete-image', deleteCloudinaryRoute());

app.use('/api/itemupload', createCloudinaryUploadRoute('itemImage', 'image'));

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// For PayPal
app.use('/api/config/paypal', (req, res) =>
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Set __dirname to current directory
const __dirname = path.resolve();
app.use(
	'/uploads/profileImages',
	express.static(path.join(__dirname, '/uploads/profileImages'))
);

app.use(
	'/uploads/itemImages',
	express.static(path.join(__dirname, '/uploads/itemImages'))
);

// Production ver
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	// Any route that is not api will be redirected to index.html
	app.get('/*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('API is running...');
	});
}

// error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
