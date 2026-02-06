import React from 'react';
import { GeneratorUnit } from '../types';

interface ControlsProps {
  amount: number;
  setAmount: (val: number) => void;
  unit: GeneratorUnit;
  setUnit: (val: GeneratorUnit) => void;
  startWithLorem: boolean;
  setStartWithLorem: (val: boolean) => void;
  asHtml: boolean;
  setAsHtml: (val: boolean) => void;
  onGenerate: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  amount,
  setAmount,
  unit,
  setUnit,
  startWithLorem,
  setStartWithLorem,
  asHtml,
  setAsHtml,
  onGenerate,
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setAmount(isNaN(val) ? 0 : val);
  };

  const handleUnitChange = (u: GeneratorUnit) => {
    setUnit(u);
    // Reset smart defaults based on unit
    if (u === GeneratorUnit.BYTES && amount < 100) setAmount(1024);
    if (u === GeneratorUnit.WORDS && amount < 10) setAmount(100);
    if (u === GeneratorUnit.PARAGRAPHS && amount > 20) setAmount(5);
    if (u === GeneratorUnit.LISTS && amount > 50) setAmount(5);
  };

  return (
    <div className="bg-offwhite p-6 border border-slate-200 mb-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
        
        {/* Amount Input */}
        <div className="w-full lg:w-32">
          <label htmlFor="amount" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Count
          </label>
          <input
            id="amount"
            type="number"
            min="1"
            max="100000"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-4 py-3 border border-slate-300 bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all text-slate-900 font-bold"
          />
        </div>

        {/* Unit Selection */}
        <div className="flex-1">
          <span className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Unit</span>
          <div className="flex flex-wrap sm:flex-nowrap gap-0 border border-slate-300 bg-white">
            {Object.values(GeneratorUnit).map((u) => (
              <button
                key={u}
                onClick={() => handleUnitChange(u)}
                className={`flex-1 py-3 px-4 text-sm font-bold transition-all capitalize border-r last:border-r-0 border-slate-200 hover:bg-slate-50 ${
                  unit === u
                    ? 'bg-primary text-white border-transparent hover:bg-primaryHover'
                    : 'text-slate-500'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="w-full lg:w-auto">
             <button
            onClick={onGenerate}
            className="w-full lg:w-auto px-8 py-3 bg-primary hover:bg-primaryHover text-white font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 border border-primary shadow-[4px_4px_0px_0px_rgba(25,130,196,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
            GENERATE
          </button>
        </div>
      </div>

      {/* Toggles Row */}
      <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-slate-200 pt-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
            />
            <div className="w-10 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border-0 after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
          </div>
          <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">
            Start with "Lorem ipsum..."
          </span>
        </label>

        {unit === GeneratorUnit.LISTS && (
           <label className="flex items-center gap-3 cursor-pointer group animate-fade-in">
           <div className="relative flex items-center">
             <input
               type="checkbox"
               className="peer sr-only"
               checked={asHtml}
               onChange={(e) => setAsHtml(e.target.checked)}
             />
             <div className="w-10 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border-0 after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
           </div>
           <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">
             Output HTML Tags
           </span>
         </label>
        )}
      </div>
    </div>
  );
};

export default Controls;