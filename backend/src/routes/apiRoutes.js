import express from 'express';
import multer from 'multer';
import { extractText } from '../controllers/ocrController.js';
import { searchQuestion } from '../controllers/searchController.js';

const router = express.Router();

// Configure Multer
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/ocr', upload.single('image'), extractText);
router.post('/search', searchQuestion);
export default router;