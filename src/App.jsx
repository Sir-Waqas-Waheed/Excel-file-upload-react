import React, { useState } from 'react';
import './App.css';
import FileInput from './FileInput';
import ExcelTable from './ExcelTable';

function App() {
  const [excelData, setExcelData] = useState(null);

  const handleDataLoad = (data) => {
    setExcelData(data);
  };

  return (
    <div className="App">
      <h1>Excel Viewer</h1>
      <FileInput onDataLoad={handleDataLoad} />
      <ExcelTable data={excelData} />
    </div>
  );
}

export default App;
