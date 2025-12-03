import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import triggerUpload from "@/lib/single-upload";

interface FileUploaderProps {
  value?: File[];
  onChange?: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  value = [],
  onChange,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const appendFiles = (files: FileList | File[]) => {
    const newFiles = [...value];
    for (const file of files) {
      if (!newFiles.some((existingFile) => existingFile.name === file.name)) {
        newFiles.push(file);
      }
    }
    onChange?.(newFiles);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    appendFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange?.(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer transition-colors hover:border-primary hover:bg-primary/10"
        onClick={async () => {
          const file = await triggerUpload({ multiple: true });
          if (file) {
            appendFiles(file);
          }
        }}
      >
        <label htmlFor="file-input" className="cursor-pointer">
          Drag and drop files here, or click to select files
        </label>
      </div>
      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <span className="truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
