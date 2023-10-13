import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB(); // Connect to Mongo DB
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/items', itemRoutes);

// error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
