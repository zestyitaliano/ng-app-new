import React from 'react';
import { ImageItem } from '../types';
import { calculateSavings, formatBytes, generateFilename } from '../utils/formatters';

interface Props {
  item: ImageItem;
  settingsFormat: string;
}

const ResultRow: React.FC<Props> = ({ item, settingsFormat }) => {
  const isDone = item.status === 'done';
  const isError = item.status === 'error';
  const isProcessing = item.status === 'processing';
  const isIdle = item.status === 'idle' || item.status === 'pending';

  const downloadFile = () => {
    if (!item.compressedBlob) return;
    const url = URL.createObjectURL(item.compressedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = generateFilename(item.file.name, item.compressedBlob, settingsFormat);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-none p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      
      {/* Thumbnail */}
      <div className="relative w-full sm:w-20 h-20 flex-shrink-0 bg-slate-100 rounded-none overflow-hidden border border-slate-200">
        <img 
            src={item.previewUrl} 
            alt={item.file.name} 
            className="w-full h-full object-cover"
        />
        {/* Spinner removed as requested, using fill loader on button instead */}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 text-center sm:text-left w-full">
        <h4 className="text-sm font-bold text-slate-800 truncate" title={item.file.name}>
          {item.file.name}
        </h4>
        
        {isError ? (
           <p className="text-xs text-[#ff595e] mt-1 font-bold uppercase">{item.error || 'Error processing'}</p>
        ) : (
           <div className="flex flex-col gap-1 mt-1">
             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-slate-500 font-medium">
                <span>{formatBytes(item.originalSize)}</span>
                {isDone && item.compressedSize && (
                    <>
                    <span className="hidden sm:inline text-[#1982c4]">→</span>
                    <span className="font-bold text-[#1982c4]">{formatBytes(item.compressedSize)}</span>
                    </>
                )}
                {isIdle && (
                    <span className="text-slate-400 italic"> - Ready to compress</span>
                )}
             </div>
             {/* Warning Display */}
             {item.warning && (
                 <p className="text-xs text-amber-600 font-bold uppercase flex items-center justify-center sm:justify-start gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                    </svg>
                    {item.warning}
                 </p>
             )}
           </div>
        )}
      </div>

      {/* Stats & Action */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        {isDone && item.compressedSize && (
            <div className="text-center sm:text-right">
                 <span className="block text-sm font-bold text-[#1982c4]">
                    -{calculateSavings(item.originalSize, item.compressedSize)}
                 </span>
                 <span className="block text-xs text-slate-400 uppercase tracking-wide">
                    {formatBytes(item.originalSize - item.compressedSize)} saved
                 </span>
            </div>
        )}
        
        {isProcessing ? (
          <div className="w-10 h-10 border border-[#1982c4]/30 bg-slate-50 relative overflow-hidden flex-shrink-0" aria-label="Processing...">
            <div className="absolute bottom-0 left-0 w-full bg-[#1982c4] animate-fill opacity-50"></div>
          </div>
        ) : (
          <button
            onClick={downloadFile}
            disabled={!isDone}
            className={`
              w-10 h-10 flex items-center justify-center rounded-none transition-colors border flex-shrink-0
              ${isDone 
                  ? 'bg-white border-[#1982c4] text-[#1982c4] hover:bg-[#1982c4] hover:text-white' 
                  : 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'}
            `}
            title={isError ? "Error" : isDone ? "Download" : "Waiting"}
          >
             {isError ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#ff595e]">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
               </svg>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 17.25V3.75M8.25 13.5 12 17.25 15.75 13.5" />
               </svg>
             )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultRow;