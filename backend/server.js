import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config();
connectDB(); // Connect to Mongo DB
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
