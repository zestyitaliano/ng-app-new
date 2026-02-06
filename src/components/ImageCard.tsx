import React, { useState } from 'react';
import { ExtractedImage } from '../types/index';
import { ExternalLink, Copy, Check, Zap, Loader2, Sparkles, XCircle, AlertCircle, Ban, Image as ImageIcon } from 'lucide-react';
import { getEstimatedDimensions } from '../utils/urlHelpers';

interface ImageCardProps {
  image: ExtractedImage;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Try to determine aspect ratio from URL to prevent layout shifts
  const estimatedDims = getEstimatedDimensions(image.url);
  const aspectRatioStyle = estimatedDims 
      ? { aspectRatio: `${estimatedDims.width} / ${estimatedDims.height}` } 
      : { aspectRatio: '1 / 1' };

  const handleCopy = () => {
    navigator.clipboard.writeText(image.url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // If the image was marked invalid during validation phase
  if (!image.isValid) {
      return (
        <div className="group relative bg-red-50/50 border border-dashed border-[#ff595e]/30 hover:border-[#ff595e] h-full flex flex-col transition-all duration-200">
            {/* Invalid Badge */}
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 text-[10px] font-bold bg-[#ff595e] text-white flex items-center gap-1">
                <Ban size={10} /> BLOCKED
              </span>
            </div>

            <div className="aspect-square w-full flex flex-col items-center justify-center p-4 text-[#ff595e]/50 gap-3">
                <div className="p-3 bg-red-100 rounded-full">
                   <AlertCircle size={24} className="text-[#ff595e]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-center text-[#ff595e]">Validation Failed</span>
            </div>
            
            <div className="p-3 border-t border-[#ff595e]/10 bg-white/50">
                 <p className="text-[10px] text-slate-400 truncate font-mono select-all line-through decoration-[#ff595e]/50" title="URL is inaccessible or invalid">
                    {image.url}
                 </p>
            </div>
        </div>
      );
  }

  // Use loadError state for runtime errors (after initial validation passed)
  if (loadError) {
      return (
        <div className="group relative bg-slate-50 border border-dashed border-slate-200 h-full flex flex-col">
            <div className="aspect-square w-full flex flex-col items-center justify-center p-4 text-slate-400 gap-2">
                <XCircle size={24} className="text-slate-300" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-center">Broken Asset</span>
            </div>
            <div className="p-3 border-t border-slate-200">
                 <p className="text-[10px] text-slate-400 truncate font-mono select-all">
                    {image.url}
                 </p>
            </div>
        </div>
      );
  }

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-[#1982c4] transition-all duration-200">
      
      {/* Type Badge */}
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white text-slate-900 border border-slate-200 shadow-sm">
          {image.type}
        </span>
        {image.source === 'regex' ? (
          <span className="px-2 py-1 text-[10px] font-bold bg-[#ffca3a] text-slate-900 border border-[#ffca3a] flex items-center gap-1 shadow-sm">
            <Zap size={10} /> REGEX
          </span>
        ) : (
          <span className="px-2 py-1 text-[10px] font-bold bg-[#8ac926] text-white border border-[#8ac926] flex items-center gap-1 shadow-sm">
            <Sparkles size={10} /> AI
          </span>
        )}
      </div>

      {/* Image Container with Dynamic Aspect Ratio */}
      <div 
        className="w-full relative overflow-hidden bg-slate-50 flex items-center justify-center transition-all duration-300"
        style={aspectRatioStyle}
      >
         {/* Checkered background for transparency */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
               backgroundSize: '20px 20px',
               backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' 
             }} 
        />
        
        {/* Skeleton Loading State */}
        {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-100 animate-pulse">
                <div className="relative">
                   <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                   <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                       <Loader2 className="w-3 h-3 text-[#1982c4] animate-spin" />
                   </div>
                </div>
                {estimatedDims && (
                  <span className="text-[9px] font-mono text-slate-400 font-bold tracking-wide mt-1">
                    {estimatedDims.width} × {estimatedDims.height}
                  </span>
                )}
            </div>
        )}

        <img 
          src={image.url} 
          alt="Extracted asset" 
          className={`relative max-w-full max-h-full object-contain transition-all duration-500 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          onError={() => { setLoadError(true); setIsLoading(false); }}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </div>

      {/* Actions */}
      <div className="p-3 bg-white border-t border-slate-200 group-hover:border-[#1982c4] transition-colors duration-200">
        <div className="flex items-center justify-between gap-2">
            <button 
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-all duration-200 ${
                  isCopied 
                  ? 'bg-[#1982c4] border-[#1982c4] text-white' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#1982c4] hover:text-[#1982c4]'
              }`}
              title="Copy URL"
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              {isCopied ? 'Copied' : 'Copy'}
            </button>
            <a 
              href={image.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center p-1.5 text-slate-400 bg-white border border-slate-200 hover:border-[#1982c4] hover:text-[#1982c4] hover:bg-slate-50 transition-all duration-200"
              title="Open in new tab"
            >
              <ExternalLink size={16} />
            </a>
        </div>
        <p className="mt-2 text-[10px] text-slate-400 truncate font-mono select-all">
          {image.url}
        </p>
      </div>
    </div>
  );
};
