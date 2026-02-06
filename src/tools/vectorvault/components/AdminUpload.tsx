
import React, { useState, useMemo, useRef } from 'react';
import { IconData } from '../types';

// Simple UUID generator for demo
const simpleUuid = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

interface SvgParseResult {
  paths: string[];
  viewBox: string;
  warnings: string[];
}

/**
 * Robustly parses SVG input to extract paths and viewBox.
 * Implements standard XML parsing with DOMParser.
 * Converts basic shapes (rect, circle, etc.) to paths.
 */
const extractSvgPaths = (input: string): SvgParseResult => {
  const result: SvgParseResult = {
    paths: [],
    viewBox: '0 0 24 24',
    warnings: []
  };

  // Trim the input and strip XML declarations and comments.
  if (!input || !input.trim()) return result;
  
  let cleanInput = input.trim();
  cleanInput = cleanInput.replace(/^<\?xml.*?\?>/i, '');
  cleanInput = cleanInput.replace(/<!--[\s\S]*?-->/g, '');
  cleanInput = cleanInput.trim();

  // Ensure the string is wrapped in a single root <svg> element if it isn’t already.
  if (!cleanInput.toLowerCase().startsWith('<svg')) {
    cleanInput = `<svg xmlns="http://www.w3.org/2000/svg">${cleanInput}</svg>`;
  }

  // Use DOMParser to parse with MIME type "image/svg+xml".
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanInput, "image/svg+xml");

  // If there is a <parsererror> node, record a warning and return.
  if (doc.querySelector('parsererror')) {
    result.warnings.push("XML Parsing failed. Please check your SVG syntax.");
    return result;
  }

  // Locate the root <svg> element.
  const rootSvg = doc.querySelector('svg');
  if (!rootSvg) {
    result.warnings.push("No <svg> root element found.");
    return result;
  }

  // For the viewBox:
  const vb = rootSvg.getAttribute('viewBox') || rootSvg.getAttribute('viewbox');
  if (vb) {
    result.viewBox = vb;
  } else {
    // If missing, try width and height attributes (parse as floats)
    const w = parseFloat(rootSvg.getAttribute('width') || 'NaN');
    const h = parseFloat(rootSvg.getAttribute('height') || 'NaN');

    if (!isNaN(w) && !isNaN(h)) {
      result.viewBox = `0 0 ${w} ${h}`;
      result.warnings.push(`ViewBox missing; generated from width/height: 0 0 ${w} ${h}`);
    } else {
      // If everything is missing or invalid, keep the default "0 0 24 24" and add a warning.
      result.warnings.push("ViewBox missing. Defaulting to 0 0 24 24.");
    }
  }

  const warningsSet = new Set<string>();
  const getVal = (el: Element, attr: string) => parseFloat(el.getAttribute(attr) || '0');

  // 1. PATHS
  const pathElements = doc.querySelectorAll('path');
  pathElements.forEach(path => {
    const d = path.getAttribute('d');
    if (d && d.trim()) {
      const normalizedD = d
        .replace(/[\n\r\t]/g, ' ') 
        .replace(/\s+/g, ' ')      
        .trim();                   
      result.paths.push(normalizedD);
    }
  });

  // 2. RECTS
  doc.querySelectorAll('rect').forEach(rect => {
     const width = parseFloat(rect.getAttribute('width') || '0');
     const height = parseFloat(rect.getAttribute('height') || '0');
     const x = parseFloat(rect.getAttribute('x') || '0');
     const y = parseFloat(rect.getAttribute('y') || '0');
     
     if (width > 0 && height > 0) {
        let rx = parseFloat(rect.getAttribute('rx') || 'NaN');
        let ry = parseFloat(rect.getAttribute('ry') || 'NaN');
        
        // standard svg behavior for rx/ry
        if (isNaN(rx)) rx = isNaN(ry) ? 0 : ry;
        if (isNaN(ry)) ry = rx;
        
        // clamp radii
        if (rx > width / 2) rx = width / 2;
        if (ry > height / 2) ry = height / 2;

        if (rx === 0 && ry === 0) {
             result.paths.push(`M ${x} ${y} H ${x + width} V ${y + height} H ${x} Z`);
        } else {
             // Rounded rect
             result.paths.push(
               `M ${x + rx} ${y} ` +
               `L ${x + width - rx} ${y} ` +
               `A ${rx} ${ry} 0 0 1 ${x + width} ${y + ry} ` +
               `L ${x + width} ${y + height - ry} ` +
               `A ${rx} ${ry} 0 0 1 ${x + width - rx} ${y + height} ` +
               `L ${x + rx} ${y + height} ` +
               `A ${rx} ${ry} 0 0 1 ${x} ${y + height - ry} ` +
               `L ${x} ${y + ry} ` +
               `A ${rx} ${ry} 0 0 1 ${x + rx} ${y} Z`
             );
        }
     } else {
         warningsSet.add('rect');
     }
  });

  // 3. CIRCLES
  doc.querySelectorAll('circle').forEach(circle => {
     const cx = getVal(circle, 'cx');
     const cy = getVal(circle, 'cy');
     const r = parseFloat(circle.getAttribute('r') || '0');
     
     if (r > 0) {
        result.paths.push(
            `M ${cx - r} ${cy} ` +
            `A ${r} ${r} 0 1 0 ${cx + r} ${cy} ` +
            `A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`
        );
     } else {
        warningsSet.add('circle');
     }
  });

  // 4. ELLIPSES
  doc.querySelectorAll('ellipse').forEach(ellipse => {
     const cx = getVal(ellipse, 'cx');
     const cy = getVal(ellipse, 'cy');
     const rx = parseFloat(ellipse.getAttribute('rx') || '0');
     const ry = parseFloat(ellipse.getAttribute('ry') || '0');
     
     if (rx > 0 && ry > 0) {
        result.paths.push(
            `M ${cx - rx} ${cy} ` +
            `A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} ` +
            `A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`
        );
     } else {
        warningsSet.add('ellipse');
     }
  });

  // 5. LINES
  doc.querySelectorAll('line').forEach(line => {
      const x1 = getVal(line, 'x1');
      const y1 = getVal(line, 'y1');
      const x2 = getVal(line, 'x2');
      const y2 = getVal(line, 'y2');
      // A line always has valid coordinates even if 0.
      result.paths.push(`M ${x1} ${y1} L ${x2} ${y2}`);
  });

  // 6. POLYLINE / POLYGON
  const processPoly = (tag: string, isPolygon: boolean) => {
      doc.querySelectorAll(tag).forEach(poly => {
          const points = poly.getAttribute('points');
          if (points) {
              // Extract numbers handles comma or space delimiters
              const coords = points.match(/[+-]?(\d*\.\d+|\d+)/g);
              if (coords && coords.length >= 2 && coords.length % 2 === 0) {
                  let d = `M ${coords[0]} ${coords[1]}`;
                  for(let i = 2; i < coords.length; i += 2) {
                      d += ` L ${coords[i]} ${coords[i+1]}`;
                  }
                  if (isPolygon) d += ' Z';
                  result.paths.push(d);
              } else {
                  warningsSet.add(tag);
              }
          } else {
              warningsSet.add(tag);
          }
      });
  };
  
  processPoly('polyline', false);
  processPoly('polygon', true);

  // Warnings for unsupported conversion
  warningsSet.forEach(tag => {
      result.warnings.push(`Found unsupported ${tag} elements that could not be converted. Please convert shapes to paths in your vector editor.`);
  });
  
  // General check if nothing was found
  if (result.paths.length === 0 && warningsSet.size === 0) {
       result.warnings.push("No valid vector elements (path, rect, circle, etc.) found.");
  }

  return result;
};

interface AdminUploadProps {
  onClose: () => void;
  onSave: (icon: IconData) => void;
}

export const AdminUpload: React.FC<AdminUploadProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [pathInput, setPathInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsedSvg = useMemo(() => extractSvgPaths(pathInput), [pathInput]);

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml') {
      alert('Please upload a valid SVG file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setPathInput(content);
        // Auto-fill name if empty
        if (!name) {
          const fileName = file.name.replace(/\.svg$/i, '').replace(/[-_]/g, ' ');
          // Capitalize first letters
          const formattedName = fileName.replace(/\b\w/g, l => l.toUpperCase());
          setName(formattedName);
        }
      }
    };
    reader.readAsText(file);
    
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (!name || !pathInput) {
      alert("Name and Path are required");
      return;
    }

    if (parsedSvg.paths.length === 0) {
      alert("Could not extract any valid SVG paths from the input. Please check your SVG data.");
      return;
    }

    const newIcon: IconData = {
      id: simpleUuid(),
      name,
      path: parsedSvg.paths,
      viewBox: parsedSvg.viewBox,
      tags,
      defaultStyle: 'stroke'
    };

    onSave(newIcon);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white border border-gray-200 w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] rounded-none">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Add New Icon</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Icon Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-offwhite border border-gray-200 px-4 py-3 text-gray-900 focus:border-primary-500 focus:bg-white focus:outline-none placeholder-gray-400 transition-colors font-medium rounded-none"
              placeholder="e.g. Settings Gear"
            />
          </div>

          {/* Upload Section */}
          <div className="space-y-3">
              <div className="flex justify-between items-end mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
                  SVG Data <span className="text-gray-400 font-normal normal-case ml-2">(Paste code or upload file)</span>
                  </label>
                  
                  <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs flex items-center gap-1 px-4 py-2 font-bold uppercase bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors rounded-none"
                  >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0L8 8m4-4v12" /></svg>
                      Upload .SVG
                  </button>
                  <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".svg"
                      className="hidden"
                  />
              </div>
              <textarea 
              rows={6}
              value={pathInput}
              onChange={(e) => setPathInput(e.target.value)}
              className="w-full bg-offwhite border border-gray-200 px-4 py-3 text-gray-600 font-mono text-xs focus:border-primary-500 focus:bg-white focus:outline-none placeholder-gray-400 transition-colors rounded-none"
              placeholder={'<svg viewBox="0 0 24 24" ...><path d="..." /></svg>'}
              />
          </div>

          {/* Enhanced Preview Section (Always Visible if data present) */}
          {pathInput && (
            <div className={`p-4 border flex flex-col sm:flex-row gap-6 transition-colors duration-200 rounded-none ${parsedSvg.paths.length === 0 ? 'bg-secondary-red/5 border-secondary-red' : 'bg-gray-50 border-gray-200'}`}>
                
                {/* Visual Preview */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className={`w-20 h-20 bg-white border flex items-center justify-center relative overflow-hidden rounded-none ${parsedSvg.paths.length === 0 ? 'border-secondary-red' : 'border-gray-200'}`}>
                       <div className="absolute inset-0 bg-[linear-gradient(45deg,#e5e7eb_1px,transparent_1px),linear-gradient(-45deg,#e5e7eb_1px,transparent_1px)] bg-[size:10px_10px] opacity-40"></div>
                       {parsedSvg.paths.length > 0 ? (
                           <svg 
                                viewBox={parsedSvg.viewBox} 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth={2} 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-12 h-12 text-gray-900"
                           >
                              {parsedSvg.paths.map((d, i) => (
                                <path key={i} d={d} />
                              ))}
                           </svg>
                       ) : (
                           <svg className="w-8 h-8 text-secondary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                           </svg>
                       )}
                    </div>
                </div>

                {/* Status & Diagnostics */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <p className={`text-sm font-bold uppercase tracking-wide ${parsedSvg.paths.length === 0 ? 'text-secondary-red' : 'text-green-600'}`}>
                            {parsedSvg.paths.length > 0 ? 'Ready to Import' : 'Invalid SVG Data'}
                        </p>
                    </div>

                    {parsedSvg.paths.length === 0 && (
                        <p className="text-sm text-secondary-red font-medium">
                            Could not extract paths. Please check the SVG code or upload a valid file.
                        </p>
                    )}
                    
                    {parsedSvg.warnings.length > 0 && (
                        <div className={`border-l-4 p-3 rounded-none ${parsedSvg.paths.length === 0 ? 'bg-white border-secondary-red' : 'bg-white border-secondary-yellow'}`}>
                            <ul className={`list-none text-xs space-y-1 font-mono ${parsedSvg.paths.length === 0 ? 'text-secondary-red' : 'text-orange-600'}`}>
                                {parsedSvg.warnings.map((w, i) => (
                                    <li key={i}>! {w}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {parsedSvg.paths.length > 0 && parsedSvg.warnings.length === 0 && (
                        <p className="text-xs text-gray-500 font-mono">
                            PATHS: {parsedSvg.paths.length} | VIEWBOX: {parsedSvg.viewBox}
                        </p>
                    )}
                </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Tags</label>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 text-xs font-bold uppercase bg-secondary-yellow/20 text-yellow-800 border border-secondary-yellow/30 rounded-none">
                  {tag}
                  <button onClick={() => removeTag(i)} className="ml-2 hover:text-black">×</button>
                </span>
              ))}
            </div>
            
            <div className="flex gap-0">
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1 bg-white border border-gray-200 px-4 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none placeholder-gray-400 rounded-none"
                placeholder="Add tag and press Enter"
              />
              <button onClick={handleAddTag} className="px-5 py-2 bg-gray-900 text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-wide rounded-none">Add</button>
            </div>
          </div>

        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-4 bg-white">
          <button onClick={onClose} className="px-5 py-2 text-gray-500 hover:text-gray-900 text-xs font-bold uppercase tracking-wide rounded-none">Cancel</button>
          <button onClick={handleSave} className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold uppercase tracking-wide shadow-lg shadow-primary-500/30 rounded-none">
            Save Icon
          </button>
        </div>
      </div>
    </div>
  );
};
