import React from 'react';
import { CompressionSettings, OutputFormat } from '../types';

interface Props {
  settings: CompressionSettings;
  onChange: (s: CompressionSettings) => void;
  disabled: boolean;
  onCompress: () => void;
  canCompress: boolean;
}

const SettingsPanel: React.FC<Props> = ({ settings, onChange, disabled, onCompress, canCompress }) => {
  
  const update = (key: keyof CompressionSettings, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-[#f8f9fa] p-6 rounded-none shadow-none border border-slate-200 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold mb-4 text-slate-800 uppercase border-b-2 border-slate-200 pb-2">Settings</h3>
        
        <div className="space-y-6">
          {/* Quality */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-600">Quality</label>
              <span className="text-sm font-bold text-[#1982c4]">{Math.round(settings.quality * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.95"
              step="0.01"
              value={settings.quality}
              onChange={(e) => update('quality', parseFloat(e.target.value))}
              disabled={disabled}
              className="w-full h-2 bg-slate-200 rounded-none appearance-none cursor-pointer accent-[#1982c4]"
            />
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Output Format</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: 'Keep Original', val: 'original' },
                { label: 'WebP', val: 'image/webp' },
                { label: 'JPEG', val: 'image/jpeg' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => update('format', opt.val as OutputFormat)}
                  disabled={disabled}
                  className={`px-3 py-2 text-xs sm:text-sm font-bold rounded-none border transition-all uppercase tracking-tight ${
                    settings.format === opt.val
                      ? 'bg-[#1982c4] border-[#1982c4] text-white shadow-md'
                      : 'bg-white border-slate-300 text-slate-600 hover:border-[#1982c4] hover:text-[#1982c4]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resize */}
          <div>
            <div className="flex items-center mb-3">
              <input
                id="resize"
                type="checkbox"
                checked={settings.resize}
                onChange={(e) => update('resize', e.target.checked)}
                disabled={disabled}
                className="w-5 h-5 text-[#1982c4] border-slate-300 rounded-none focus:ring-[#1982c4] accent-[#1982c4]"
              />
              <label htmlFor="resize" className="ml-2 text-sm text-slate-700 font-medium cursor-pointer">Resize (optional)</label>
            </div>
            
            {settings.resize && (
              <div className="ml-7">
                <label className="block text-xs text-slate-500 mb-1 font-bold">MAX DIMENSION (PX)</label>
                <input
                  type="number"
                  value={settings.maxWidth}
                  onChange={(e) => update('maxWidth', parseInt(e.target.value) || 0)}
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-[#1982c4] bg-white"
                />
                <p className="text-xs text-slate-400 mt-1">Preserves aspect ratio.</p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center">
              <input
                id="strip"
                type="checkbox"
                checked={settings.stripMetadata}
                onChange={(e) => update('stripMetadata', e.target.checked)}
                disabled={disabled}
                className="w-5 h-5 text-[#1982c4] border-slate-300 rounded-none focus:ring-[#1982c4] accent-[#1982c4]"
              />
              <label htmlFor="strip" className="ml-2 text-sm text-slate-700 font-medium cursor-pointer">Strip Metadata</label>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <button
          onClick={onCompress}
          disabled={!canCompress}
          className={`
            w-full py-4 text-center font-bold uppercase tracking-wider text-sm transition-all
            ${canCompress 
              ? 'bg-[#1982c4] text-white hover:bg-[#156a9e] shadow-lg hover:shadow-xl transform active:scale-[0.99]' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
          `}
        >
          {disabled ? 'Compressing...' : 'Compress Images'}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;