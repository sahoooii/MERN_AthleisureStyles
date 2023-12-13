import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB(); // Connect to Mongo DB
const PORT = process.env.PORT || 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
// To allow to access cookie.request
app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profileupload', uploadRoutes);
app.use('/api/orders', orderRoutes);

// For PayPal
app.use('/api/config/paypal', (req, res) =>
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Set __dirname to current directory
const __dirname = path.resolve();
app.use(
	'/profileImages',
	express.static(path.join(__dirname, '/profileImages'))
);

// error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
