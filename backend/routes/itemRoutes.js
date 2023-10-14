import express from 'express';
import { getItems, getItemById } from '../controllers/itemController.js';

const router = express.Router();

router.route('/').get(getItems);
router.route('/:id').get(getItemById);

export default router;
