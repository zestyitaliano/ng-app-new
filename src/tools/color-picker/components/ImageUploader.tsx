import React, { useRef, useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageLoad: (base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageLoad }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP, GIF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onImageLoad(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative group cursor-pointer w-full h-80 border-2 border-dashed 
        flex flex-col items-center justify-center text-center transition-all duration-300
        ${isDragging 
          ? 'border-primary bg-blue-50/50' 
          : 'border-slate-300 hover:border-primary hover:bg-white bg-offwhite'
        }
      `}
      role="button"
      tabIndex={0}
      aria-label="Upload or drag and drop an image"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/png, image/jpeg, image/webp, image/gif"
        onChange={handleFileChange}
      />
      
      <div className="p-6 flex flex-col items-center space-y-5">
        <div className={`p-5 border-2 ${isDragging ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary'} transition-colors duration-300`}>
          {isDragging ? (
            <Upload className="w-8 h-8" />
          ) : (
            <ImageIcon className="w-8 h-8" />
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900">
            {isDragging ? 'DROP IT HERE' : 'UPLOAD A FILE'}
          </h3>
          <p className="text-sm font-medium text-slate-500">
            {isDragging ? 'Release to upload' : 'Drag and Drop Your File Here'}
          </p>
        </div>
        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          PNG, JPG, WEBP, GIF
        </p>
      </div>
    </div>
  );
};