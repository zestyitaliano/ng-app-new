import React, { useState, useEffect, useCallback } from 'react';
import ToolLayout from "../../components/ToolLayout";
import { DimensionInput } from './components/DimensionInput';
import { RatioDisplay } from './components/RatioDisplay';
import { roundValue, isValidNumber } from './utils/math';
import { toolMeta } from './meta';

// Icons
const SwapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 4v16M17 4l-4 4M17 4l4 4M7 20V4M7 20l-4-4M7 20l4-4" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="0" ry="0" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

export default function ProportionScalerTool() {
  // State
  const [origW, setOrigW] = useState<string>('');
  const [origH, setOrigH] = useState<string>('');
  const [newW, setNewW] = useState<string>('');
  const [newH, setNewH] = useState<string>('');
  const [isRounded, setIsRounded] = useState<boolean>(true);
  const [activeNewField, setActiveNewField] = useState<'width' | 'height' | null>(null);

  // Copy Feedback State
  const [copiedW, setCopiedW] = useState(false);
  const [copiedH, setCopiedH] = useState(false);

  // Derived Values
  const w = parseFloat(origW);
  const h = parseFloat(origH);
  const isValidOriginal = !isNaN(w) && w > 0 && !isNaN(h) && h > 0;

  // Calculation Logic
  const calculate = useCallback((
    sourceType: 'width' | 'height', 
    valueStr: string, 
    originalW: number, 
    originalH: number, 
    shouldRound: boolean
  ) => {
    const val = parseFloat(valueStr);
    if (isNaN(val) || val < 0) return '';
    if (val === 0) return '0';

    if (sourceType === 'width') {
      // New Width changed -> Calculate New Height
      // h2 = w2 * (h1/w1)
      const calculatedH = val * (originalH / originalW);
      return roundValue(calculatedH, shouldRound);
    } else {
      // New Height changed -> Calculate New Width
      // w2 = h2 * (w1/h1)
      const calculatedW = val * (originalW / originalH);
      return roundValue(calculatedW, shouldRound);
    }
  }, []);

  // Update dependents when original dimensions change
  useEffect(() => {
    if (!isValidOriginal) return;
    
    // If we have an active new field, re-calculate the other one based on the new ratio
    if (activeNewField === 'width' && isValidNumber(newW)) {
      setNewH(calculate('width', newW, w, h, isRounded));
    } else if (activeNewField === 'height' && isValidNumber(newH)) {
      setNewW(calculate('height', newH, w, h, isRounded));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origW, origH, isRounded]); 

  // Handlers
  const handleSwap = () => {
    setOrigW(origH);
    setOrigH(origW);
  };

  const handleNewWidthChange = (val: string) => {
    setNewW(val);
    setActiveNewField('width');
    if (isValidOriginal && isValidNumber(val)) {
      setNewH(calculate('width', val, w, h, isRounded));
    } else if (val === '') {
      setNewH('');
    }
  };

  const handleNewHeightChange = (val: string) => {
    setNewH(val);
    setActiveNewField('height');
    if (isValidOriginal && isValidNumber(val)) {
      setNewW(calculate('height', val, w, h, isRounded));
    } else if (val === '') {
      setNewW('');
    }
  };

  const handleClear = () => {
    setOrigW('');
    setOrigH('');
    setNewW('');
    setNewH('');
    setActiveNewField(null);
  };

  const copyToClipboard = async (text: string, type: 'w' | 'h') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'w') {
        setCopiedW(true);
        setTimeout(() => setCopiedW(false), 2000);
      } else {
        setCopiedH(true);
        setTimeout(() => setCopiedH(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-2xl">
      <div className="w-full mx-auto">
        {/* Card */}
        <div className="bg-white rounded-none border-2 border-slate-800 overflow-hidden shadow-sm">
          
          {/* Top Toolbar */}
          <div className="bg-white px-8 py-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-base font-extrabold text-slate-700 flex items-center gap-3 uppercase tracking-wider">
              <span className="w-3 h-3 bg-brand-500 rounded-none"></span>
              Scaler Tool
            </h2>
            
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 cursor-pointer select-none text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-wide">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isRounded}
                    onChange={(e) => setIsRounded(e.target.checked)}
                  />
                  {/* Custom Switch Component */}
                  <div className="w-12 h-7 bg-white border-2 border-brand-500 peer-focus:outline-none rounded-none peer flex items-center p-0.5 transition-colors">
                    <div className={`w-5 h-5 bg-brand-500 transition-all duration-200 ${isRounded ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                Round Pixels
              </label>
            </div>
          </div>

          {/* Main Input Area */}
          <div className="p-8 space-y-8">
            
            {/* Originals Row */}
            <section>
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                Original Dimensions
               </h3>
               <div className="flex items-end gap-6">
                  <div className="flex-1">
                    <DimensionInput 
                      id="orig-w" 
                      label="WIDTH" 
                      value={origW} 
                      onChange={setOrigW}
                      error={origW !== '' && (!isValidNumber(origW))}
                    />
                  </div>
                  <div className="flex-1">
                    <DimensionInput 
                      id="orig-h" 
                      label="HEIGHT" 
                      value={origH} 
                      onChange={setOrigH}
                      error={origH !== '' && (!isValidNumber(origH))}
                    />
                  </div>
                  {/* Swap Button */}
                  <button 
                    onClick={handleSwap}
                    className="flex-none mb-[2px] h-[54px] w-[54px] flex items-center justify-center rounded-none bg-white text-brand-500 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200 border-2 border-brand-500 active:scale-95"
                    title="Swap Width and Height"
                    aria-label="Swap dimensions"
                  >
                    <div className="transform rotate-90">
                        <SwapIcon />
                    </div>
                  </button>
               </div>
            </section>

            {/* Middle Ratio Display */}
            <div className="flex justify-center py-2">
               <RatioDisplay width={w} height={h} isValid={isValidOriginal} />
            </div>

            {/* New Dimensions Row */}
            <section className="relative w-full">
               <h3 className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-4 border-b border-brand-500/10 pb-2">
                New Dimensions
               </h3>
               
               {/* Labels always visible to maintain structure */}
               <div className="grid grid-cols-2 gap-6 mb-1">
                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">New Width</label>
                 <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">New Height</label>
               </div>

               {/* Conditional Content: Placeholder Box OR Inputs */}
               {!isValidOriginal ? (
                 <div className="w-full h-[54px] border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 rounded-none">
                   <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                     Enter Original Dimensions
                   </p>
                 </div>
               ) : (
                 <div className="flex gap-6">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={newW}
                        onChange={(e) => handleNewWidthChange(e.target.value)}
                        className="w-full px-4 py-3 text-lg font-medium rounded-none border-2 border-transparent bg-offwhite text-slate-900 focus:border-brand-500 outline-none placeholder:text-slate-400"
                        placeholder=""
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={newH}
                        onChange={(e) => handleNewHeightChange(e.target.value)}
                        className="w-full px-4 py-3 text-lg font-medium rounded-none border-2 border-transparent bg-offwhite text-slate-900 focus:border-brand-500 outline-none placeholder:text-slate-400"
                        placeholder=""
                      />
                    </div>
                 </div>
               )}
            </section>
          </div>

          {/* Action Footer */}
          <div className="bg-white px-8 py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
             <button
                onClick={handleClear}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-none text-accent font-extrabold hover:text-accent-hover transition-colors text-sm tracking-wide uppercase"
             >
               <span className="group-hover:rotate-90 transition-transform duration-300"><ClearIcon /></span> CLEAR
             </button>

             <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
               {/* Copy Width Button */}
               <button
                  onClick={() => copyToClipboard(newW, 'w')}
                  disabled={!isValidNumber(newW)}
                  className={`
                    flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-none font-bold shadow-sm transition-all border-2 text-sm uppercase tracking-wide min-w-[160px]
                    ${isValidNumber(newW) 
                      ? 'bg-white border-brand-500 text-brand-500 hover:bg-brand-50 hover:shadow-md active:translate-y-0.5' 
                      : 'bg-white border-slate-200 text-slate-300 cursor-not-allowed'}
                  `}
               >
                 {copiedW ? <CheckIcon /> : <CopyIcon />}
                 {copiedW ? 'COPIED' : 'COPY WIDTH'}
               </button>

               {/* Copy Height Button */}
               <button
                  onClick={() => copyToClipboard(newH, 'h')}
                  disabled={!isValidNumber(newH)}
                  className={`
                    flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-none font-bold shadow-sm transition-all border-2 text-sm uppercase tracking-wide min-w-[160px]
                    ${isValidNumber(newH) 
                      ? 'bg-brand-500 border-brand-500 text-white hover:bg-brand-600 hover:border-brand-600 hover:shadow-md active:translate-y-0.5' 
                      : 'bg-slate-100 border-transparent text-slate-300 cursor-not-allowed'}
                  `}
               >
                 {copiedH ? <CheckIcon /> : <CopyIcon />}
                 {copiedH ? 'COPIED' : 'COPY HEIGHT'}
               </button>
             </div>
          </div>
        </div>

        {/* Copyright / Footer */}
        <footer className="mt-12 text-center text-slate-400 text-xs font-semibold tracking-wide">
          &copy; {new Date().getFullYear()} Proportion Scaler. Designed for creators.
        </footer>
      </div>
    </ToolLayout>
  );
}
