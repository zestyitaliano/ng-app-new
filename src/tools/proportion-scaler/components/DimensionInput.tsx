import React from 'react';

interface DimensionInputProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  onFocus?: () => void;
  readOnly?: boolean;
  suffix?: React.ReactNode;
}

export const DimensionInput: React.FC<DimensionInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  error,
  onFocus,
  readOnly,
  suffix
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type="number"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 text-lg font-medium rounded-none border-2 transition-all duration-200 outline-none
            placeholder:text-slate-400
            ${error 
              ? 'border-accent bg-red-50 text-accent focus:border-accent' 
              : 'border-transparent bg-offwhite text-slate-900 focus:border-brand-500 hover:border-slate-300'
            }
            ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-accent font-medium ml-1">
          Please enter a valid positive number
        </span>
      )}
    </div>
  );
};