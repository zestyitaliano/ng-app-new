import React from 'react';

interface ProcessingOverlayProps {
  progress: number;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ progress }) => {
  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-none border border-slate-200">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-bold text-slate-800 mb-2">Extracting text, please wait...</p>
      <div className="w-64 h-3 bg-slate-200 rounded-none overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-slate-500 mt-2 font-medium">{progress}%</p>
    </div>
  );
};

export default ProcessingOverlay;