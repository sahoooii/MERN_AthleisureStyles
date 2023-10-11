import express from 'express';
import dotenv from 'dotenv';
import items from './data/items.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

// Get all items
app.get('/api/items', (req, res) => {
	res.json(items);
});

// Single item
app.get('/api/items/:id', (req, res) => {
	const item = items.find((item) => item._id === req.params.id);
	res.json(item);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
