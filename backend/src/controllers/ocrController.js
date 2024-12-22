// import Tesseract from 'tesseract.js';
// import path from 'path';
// import { translateText } from './translateController.js';

// export const extractText = async (req, res) => {
//   try {
//     // console.log("req.file from apiRoutes.js: ", req.file);
//     const imagePath = path.join(req.file.path);
//     // console.log("imagePath: ", imagePath);

//     const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
//     console.log("extracted text: ", text)
//     const translatedText = await translateText(text.trim());
//     // console.log("translated text: ", translatedText)
//     res.json({ success: true, extractedText: text.trim(), translatedText : translatedText });
//     // console.log("extracted text: ", text)
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'OCR failed', error: error.message });
//   }
// };


// import Tesseract from 'tesseract.js';
// import path from 'path';
// import { translateText } from './translateController.js';

// export const extractText = async (req, res) => {
//   try {
//     // Ensure a file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'No file uploaded.' });
//     }

//     // Get the path of the uploaded image
//     const imagePath = path.join(req.file.path);

//     // Perform OCR to extract text from the image
//     const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
//     const extractedText = text.trim();

//     console.log('Extracted text:', extractedText);

//     if (!extractedText) {
//       return res.status(400).json({ success: false, message: 'No text found in the image.' });
//     }

//     // Translate the extracted text
//     const translatedText = await translateText(extractedText);
//     console.log('Translated text:', translatedText);

//     // Respond with both the extracted and translated text
//     res.json({
//       success: true,
//       extractedText,
//       translatedText: translatedText || 'Translation failed. Please try again.',
//     });
//   } catch (error) {
//     console.error('Error during OCR or translation:', error.message);
//     res.status(500).json({ success: false, message: 'OCR or translation failed', error: error.message });
//   }
// };



import Tesseract from 'tesseract.js';
import path from 'path';
import { translateText } from './translateController.js';

export const extractText = async (req, res) => {
  try {
    const imagePath = path.join(req.file.path);

    const { data: { text } } = await Tesseract.recognize(imagePath, 'sin');
    console.log("Extracted text: ", text);

    const translatedText = await translateText(text.trim());
    console.log("Translated text: ", translatedText);

    res.json({ 
      success: true, 
      extractedText: text.trim(), 
      translatedText 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'OCR or Translation failed', 
      error: error.message 
    });
  }
};
