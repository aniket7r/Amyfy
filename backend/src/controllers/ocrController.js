import Tesseract from 'tesseract.js';
import path from 'path';

export const extractText = async (req, res) => {
  try {
    const imagePath = path.join(__dirname, '../../', req.file.path);

    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    res.json({ success: true, extractedText: text.trim() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'OCR failed', error: error.message });
  }
};