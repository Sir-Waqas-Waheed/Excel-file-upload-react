// src/components/FileInput.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function FileInput({ onDataLoad }) {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileData = await readFile(selectedFile);
      onDataLoad(fileData);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
        resolve(sheetData);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
    </div>
  );
}

export default FileInput;
