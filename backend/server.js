import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import profileImageUploadRoutes from './routes/profileImageUploadRoutes.js';
import itemImageUploadRoutes from './routes/itemImageUploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB(); // Connect to Mongo DB
const PORT = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
	res.on('finish', () => {
		console.log('CORS Headers:', res.getHeaders());
	});
	next();
});

app.options('*', (req, res) => {
	res.header(
		'Access-Control-Allow-Origin',
		'https://mern-athleisure-styles.vercel.app'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.sendStatus(200);
});

app.use(
	cors({
		origin: [
			'http://localhost:3000', // Front-end(for local)
			'http://127.0.0.1:3000', // local other ver.
			'https://athleisurestyles.onrender.com', // render
			'https://mern-athleisure-styles.vercel.app', //vercel
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ 許可するメソッドAllow method
		credentials: true, // Auth（Cookie, JWT など）
	})
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
// To allow to access cookie.request
app.use(cookieParser());

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profileupload', profileImageUploadRoutes);
app.use('/api/itemupload', itemImageUploadRoutes);
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
	app.get('*', (req, res) =>
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
