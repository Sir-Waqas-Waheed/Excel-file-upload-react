import React from 'react';
import FileInput from './FileInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <h1>File Viewer</h1>
      </div>
      <div className='upload-div'>
        <h1>File Upload</h1>
        <FileInput />
      </div>
    </div>
  );
}

export default App;
