const express = require('express');
const multer = require('multer');
const { extractText } = require('../controllers/ocrController');
const { searchQuestion } = require('../controllers/searchController');

const router = express.Router();

// Configure Multer
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/ocr', upload.single('image'), extractText);
router.post('/search', searchQuestion);

module.exports = router;
