import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader({ setOcrText }) {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOcrText(response.data.extractedText);
    } catch (error) {
      alert('Failed to extract text. Please try again.');
    }
  };

  return (
    <div className="image-uploader">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded Preview" />}
    </div>
  );
}

export default ImageUploader;
