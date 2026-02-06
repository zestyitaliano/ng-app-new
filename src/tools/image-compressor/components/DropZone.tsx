import React, { useCallback, useState } from 'react';
import { ACCEPTED_FILE_TYPES } from '../constants';

interface Props {
  onFilesAdded: (files: File[]) => void;
  isProcessing: boolean;
}

const DropZone: React.FC<Props> = ({ onFilesAdded, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!isProcessing) setIsDragOver(true);
  }, [isProcessing]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  }, [onFilesAdded, isProcessing]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
    }
  }, [onFilesAdded]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-none p-8 text-center transition-all duration-200
        flex flex-col items-center justify-center min-h-[240px] h-full
        ${isDragOver 
          ? 'border-[#1982c4] bg-[#1982c4]/5' 
          : 'border-slate-300 bg-[#f8f9fa] hover:border-[#1982c4]/50'
        }
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
        <input
            type="file"
            multiple
            accept={Object.keys(ACCEPTED_FILE_TYPES).join(',')}
            onChange={handleFileChange}
            disabled={isProcessing}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <div className="w-16 h-16 bg-[#1982c4]/10 text-[#1982c4] rounded-full flex items-center justify-center mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
        </div>

        <span className="bg-[#1982c4] text-white px-6 py-2 rounded-none font-bold shadow-md mb-3 hover:bg-[#156a9e] transition-colors uppercase text-sm tracking-wide">
            Upload Images
        </span>
        
        <p className="text-slate-500 text-sm font-medium">
            Or Drag And Drop Your Images Here
        </p>
        <p className="text-slate-400 text-xs mt-2">
            PNG, JPG, WEBP supported
        </p>
    </div>
  );
};

export default DropZone;