// src/components/ImageUploader.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader({ setOcrText, setTranslateText }) {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('https://amyfy-backend-chi.vercel.app/api/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOcrText(response.data.extractedText);
      setTranslateText(response.data.translatedText);
    } catch (error) {
      alert('Failed to extract text. Please try again.');
    }
  };

  return (
    <div className="image-uploader">
      <label className="upload-box">
        Drag & Drop or Click to Upload Image
        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
      </label>
      {image && <img src={image} alt="Uploaded Preview" className="uploaded-image" />}
      <button className="upload-button" onClick={() => document.querySelector('.file-input').click()}>Upload Image</button>
    </div>
  );
}

export default ImageUploader;
