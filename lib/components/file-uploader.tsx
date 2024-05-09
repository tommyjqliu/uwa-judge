import React, { useState } from "react";
import axios from "../axios";

interface FileUploaderProps {
  value: File[];
  onChange: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ value, onChange }) => {
  const [files, setFiles] = useState<File[]>(value);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = [...files, ...droppedFiles];
    setFiles(newFiles);
    onChange(newFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onChange(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input type="file" multiple onChange={handleFileInput} />
        <p>Drag and drop files here, or click to select files.</p>
      </div>
      <div>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.name}
              <button onClick={() => handleRemoveFile(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploader;
