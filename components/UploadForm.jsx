'use client'
import React, { useRef, useState } from 'react';
import PhotoCard from './PhotoCard'

const UploadForm = () => {
  const formRef = useRef();
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  async function handleInputFiles(e) {
    const newFiles = Array.from(e.target.files); // Convert FileList to array

    const validFiles = newFiles.filter((file) => {
      if (file.size > 2 * 1024 * 1024) { // Check for 2 MB size limit
        setErrorMessage('Error: File size exceeds 2MB limit.');
        return false;
      }

      if (!file.type.startsWith('image/')) {
        setErrorMessage('Error: Only image files are allowed.');
        return false;
      }

      // Limit to one file
      if (files.length > 0) {
        setErrorMessage('Error: Only one image upload is allowed.');
        return false;
      }

      return true; // Only add valid files
    });

    setFiles(validFiles);
  }

  const clearError = () => setErrorMessage(null); // Function to clear error message

  return (
    <form action="" ref={formRef}>
      <div style={{ background: 'white', minHeight: 200, margin: '10px 0', padding: 10 }}>
        
        <input type="file" accept="image/*" multiple onChange={handleInputFiles} />
        
        {errorMessage && ( 
            // Display error message if present
          <h5 style={{ color: 'red' }}>{errorMessage}</h5> )}
        
        <h5 style={{ color: 'red' }}>(*) อัพโหลดเพียง 1รูป</h5>
        {/* preview image */}
        <div>
            {
                files.map((fiel, index) => (
                    <PhotoCard key={index}/>
                ))
            }
        </div>
      </div>
    </form>
  );
};

export default UploadForm;