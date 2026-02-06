import React, { useCallback, useRef, useState } from "react";
import { ACCEPTED_IMAGE_TYPES } from "../constants";
import { Button } from "../../../components/Button";

interface DropZoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileSelected, disabled }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      setIsDragActive(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);
      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          onFileSelected(file);
        } else {
          alert("Please upload a valid image file (PNG, JPG, WEBP).");
        }
      }
    },
    [onFileSelected, disabled]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={[
        "relative group border-2 border-dashed p-8 sm:p-12 transition-all duration-200 ease-in-out text-center cursor-pointer rounded-none",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-slate-300 hover:border-primary hover:bg-white",
        disabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "bg-white",
      ].join(" ")}
      onClick={() => {
        if (!disabled) inputRef.current?.click();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        onChange={handleFileInput}
        disabled={disabled}
      />

      <div className="space-y-4">
        <div className="w-16 h-16 mx-auto bg-secondary1 text-primary rounded-none flex items-center justify-center mb-4 shadow-sm">
          {/* Upload Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          Image to Text Converter
        </h3>

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="primary"
            size="md"
            className="uppercase tracking-wide"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            disabled={disabled}
          >
            Upload Image
          </Button>

          <span className="text-slate-400 text-sm">Or</span>
          <span className="text-slate-500 font-medium">
            Drag and drop your image here
          </span>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
