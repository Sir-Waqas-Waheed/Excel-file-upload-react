import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function FileInput() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);

      await axios.post('https://192.168.1.77:7103/api/Share', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Due to some technical issues, file upload failed');
    }
  };

  return (
    <div className='fileinput'>
      <div className='buttons'>
        <input type="file" onChange={handleFileChange} />
        {filePreview && (
          <div>
            <h3>File Preview:</h3>
            {selectedFile.type.startsWith('image/') ? (
              <img src={filePreview} alt="File Preview" width="200" />
            ) : (
              <p>{selectedFile.name}</p>
            )}
          </div>
        )}
        <button onClick={handleFileUpload}>Upload</button>
      </div>
    </div>
  );
}

export default FileInput;
