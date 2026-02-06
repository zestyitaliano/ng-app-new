import React, { useState, useEffect } from 'react';
import { IconData, IconCustomization } from '../types';

interface IconEditorProps {
  icon: IconData;
  onClose: () => void;
}

// Helper to download SVG
const downloadSVG = (svgContent: string, filename: string) => {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const IconEditor: React.FC<IconEditorProps> = ({ icon, onClose }) => {
  const [config, setConfig] = useState<IconCustomization>({
    color: '#1982c4', // Default to primary blue
    size: 32,
    strokeWidth: 2,
    style: icon.defaultStyle || 'stroke'
  });
  const [copied, setCopied] = useState('');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Reset config when icon changes
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      style: icon.defaultStyle || 'stroke',
      color: '#1982c4'
    }));
    setIsDetailsOpen(false);
  }, [icon]);

  const generateSvgString = (isExport = false) => {
    const width = config.size;
    const height = config.size;
    
    // Determine attributes based on style
    const fillAttr = config.style === 'fill' ? config.color : 'none';
    const strokeAttr = config.style === 'stroke' ? config.color : 'none';
    const strokeWidthAttr = config.style === 'stroke' ? config.strokeWidth : 0;

    // Paths
    const pathsHtml = icon.path.map(d => `<path d="${d}"></path>`).join('');

    return `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="${width}" 
  height="${height}" 
  viewBox="${icon.viewBox || '0 0 24 24'}" 
  fill="${fillAttr}" 
  stroke="${strokeAttr}" 
  stroke-width="${strokeWidthAttr}" 
  stroke-linecap="round" 
  stroke-linejoin="round"
>${pathsHtml}</svg>`;
  };

  const generateReactCode = () => {
     const fillAttr = config.style === 'fill' ? `'${config.color}'` : `'none'`;
     const strokeAttr = config.style === 'stroke' ? `'${config.color}'` : `'none'`;
     const swAttr = config.style === 'stroke' ? ` strokeWidth={${config.strokeWidth}}` : '';

     return `import React from 'react';

const ${icon.name.replace(/\s+/g, '')}Icon = ({ size = ${config.size} }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="${icon.viewBox || '0 0 24 24'}" 
    fill=${fillAttr}
    stroke=${strokeAttr}${swAttr}
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    ${icon.path.map(d => `<path d="${d}" />`).join('\n    ')}
  </svg>
);`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleDownload = () => {
    const svg = generateSvgString(true);
    downloadSVG(svg, `${icon.name.toLowerCase().replace(/\s+/g, '-')}.svg`);
  };

  return (
    <div className="fixed inset-0 z-30 flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white h-full border-l border-gray-200 flex flex-col pointer-events-auto shadow-2xl rounded-none">
        
        {/* Header */}
        <div className="h-20 border-b border-gray-200 flex items-center justify-between px-8 bg-white">
          <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{icon.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors rounded-none">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Preview */}
          <div className="bg-offwhite border border-gray-200 p-8 flex items-center justify-center min-h-[240px] relative overflow-hidden group rounded-none">
             {/* Lighter grid pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,#d1d5db_1px,transparent_1px),linear-gradient(-45deg,#d1d5db_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
             
             {/* The Rendered Icon */}
             <div 
                className="relative transition-all duration-200"
                style={{ 
                    width: config.size, 
                    height: config.size,
                    filter: `drop-shadow(0 0 0px ${config.color}33)` 
                }}
             >
               <svg
                 viewBox={icon.viewBox || "0 0 24 24"}
                 width="100%"
                 height="100%"
                 fill={config.style === 'fill' ? config.color : 'none'}
                 stroke={config.style === 'stroke' ? config.color : 'none'}
                 strokeWidth={config.style === 'stroke' ? config.strokeWidth : 0}
                 strokeLinecap="round"
                 strokeLinejoin="round"
               >
                 {icon.path.map((d, i) => <path key={i} d={d} />)}
               </svg>
             </div>
             <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 font-mono font-bold uppercase">
               PREVIEW
             </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            {/* Style Toggle */}
            <div className="flex border border-gray-300 rounded-none overflow-hidden">
              {(['stroke', 'fill'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setConfig({ ...config, style: mode })}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                    config.style === mode ? 'bg-gray-900 text-white' : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Sliders & Inputs */}
            <div className="space-y-6">
              
              {/* Size */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs uppercase tracking-wide font-bold">
                  <label className="text-gray-500">Size</label>
                  <span className="text-gray-900 font-mono">{config.size}px</span>
                </div>
                <input 
                  type="range" min="12" max="128" step="4"
                  value={config.size}
                  onChange={(e) => setConfig({ ...config, size: Number(e.target.value) })}
                  className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              {/* Stroke Width (only if stroke) */}
              {config.style === 'stroke' && (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs uppercase tracking-wide font-bold">
                    <label className="text-gray-500">Stroke Width</label>
                    <span className="text-gray-900 font-mono">{config.strokeWidth}px</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="4" step="0.5"
                    value={config.strokeWidth}
                    onChange={(e) => setConfig({ ...config, strokeWidth: Number(e.target.value) })}
                    className="w-full h-1 bg-gray-200 appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
              )}

              {/* Color */}
              <div className="space-y-2">
                <label className="text-xs text-gray-500 block uppercase tracking-wide font-bold">Color</label>
                <div className="flex items-center gap-0 border border-gray-300 rounded-none">
                   <div className="relative w-12 h-12 overflow-hidden border-r border-gray-300 shrink-0">
                      <input 
                        type="color" 
                        value={config.color}
                        onChange={(e) => setConfig({ ...config, color: e.target.value })}
                        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                      />
                   </div>
                   <input 
                      type="text" 
                      value={config.color.toUpperCase()}
                      onChange={(e) => setConfig({ ...config, color: e.target.value })}
                      className="flex-1 bg-white px-4 py-2 text-sm text-gray-900 font-mono focus:bg-gray-50 focus:outline-none uppercase font-bold"
                   />
                </div>
                <div className="flex gap-2 mt-2">
                    {[ '#1982c4', '#ffca3a', '#ff595e', '#000000', '#9ca3af'].map(preset => (
                        <button 
                            key={preset}
                            onClick={() => setConfig({...config, color: preset})}
                            className="w-6 h-6 border border-gray-200 rounded-none"
                            style={{ backgroundColor: preset }}
                        />
                    ))}
                </div>
              </div>

            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Export</h4>
            
            {/* SVG Code */}
            <div className="relative group">
               <label className="text-[10px] text-gray-500 mb-2 block uppercase tracking-wider font-bold">SVG Code</label>
               <pre className="bg-gray-100 p-4 text-xs text-gray-600 font-mono overflow-x-auto border border-gray-200 h-24 scrollbar-thin rounded-none">
                 {generateSvgString(true)}
               </pre>
               <button 
                  onClick={() => handleCopy(generateSvgString(true), 'svg')}
                  className="absolute top-9 right-2 px-3 py-1 bg-white hover:bg-gray-900 hover:text-white text-[10px] uppercase font-bold text-gray-900 border border-gray-200 transition-colors shadow-sm rounded-none"
               >
                  {copied === 'svg' ? 'Copied!' : 'Copy'}
               </button>
            </div>

            {/* React Component */}
            <div className="relative group">
               <label className="text-[10px] text-gray-500 mb-2 block uppercase tracking-wider font-bold">React Component</label>
               <pre className="bg-gray-100 p-4 text-xs text-gray-600 font-mono overflow-x-auto border border-gray-200 h-24 scrollbar-thin rounded-none">
                 {generateReactCode()}
               </pre>
               <button 
                  onClick={() => handleCopy(generateReactCode(), 'react')}
                  className="absolute top-9 right-2 px-3 py-1 bg-white hover:bg-gray-900 hover:text-white text-[10px] uppercase font-bold text-gray-900 border border-gray-200 transition-colors shadow-sm rounded-none"
               >
                  {copied === 'react' ? 'Copied!' : 'Copy'}
               </button>
            </div>

            <button 
              onClick={handleDownload}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 rounded-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download SVG
            </button>
          </div>

          {/* Raw Data & ViewBox Info (Collapsible) */}
          <div className="border-t border-gray-200 pt-6">
            <button 
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="flex items-center justify-between w-full text-left group"
            >
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider group-hover:text-primary-600 transition-colors">
                    Path Details
                </h4>
                <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${isDetailsOpen ? 'rotate-180' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isDetailsOpen && (
                <div className="mt-4 space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">ViewBox</label>
                        <div className="bg-gray-100 p-3 text-xs text-gray-700 font-mono border border-gray-200 rounded-none">
                            {icon.viewBox || '0 0 24 24'}
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                         <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Paths ({icon.path.length})</label>
                         <div className="bg-gray-100 p-3 text-xs text-gray-600 font-mono border border-gray-200 overflow-x-auto max-h-40 scrollbar-thin rounded-none">
                            {icon.path.map((p, i) => (
                                <div key={i} className="mb-2 last:mb-0 break-all">
                                    <span className="text-gray-400 select-none mr-2">[{i}]</span>
                                    {p}
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
