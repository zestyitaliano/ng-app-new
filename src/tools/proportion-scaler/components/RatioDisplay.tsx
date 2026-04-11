import React from 'react';
import { getSimplifiedRatio } from '../utils/math';

interface RatioDisplayProps {
  width: number;
  height: number;
  isValid: boolean;
  className?: string;
}

export const RatioDisplay: React.FC<RatioDisplayProps> = ({
  width,
  height,
  isValid,
  className = "",
}) => {
  const decimalRatio = isValid ? (width / height).toFixed(4) : '—';
  const simpleRatio = isValid ? getSimplifiedRatio(width, height) : '—';

  return (
    <div className={`flex flex-col items-center justify-center py-4 px-6 bg-secondary rounded-none w-full sm:w-auto min-w-[140px] ${className}`}>
      <div className="text-slate-900 text-xs uppercase font-extrabold tracking-wider mb-1 opacity-75">Aspect Ratio</div>
      <div className="text-2xl font-extrabold text-slate-900 tabular-nums tracking-tight">
        {simpleRatio || decimalRatio}
      </div>
      <div className="text-xs text-slate-900 font-mono mt-1 font-bold opacity-60">
        {isValid ? `(${decimalRatio})` : '(Wait for input)'}
      </div>
    </div>
  );
};
