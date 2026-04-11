import React, { useState } from 'react';
import { FontFile, ConvertedFile, FontFormat } from '../types';
import { convertFont } from '../services/fontService';
import { Button } from '../../../components/Button';
import { FileType, Download, Trash2, Type, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface FontCardProps {
  fontFile: FontFile;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

export const FontCard: React.FC<FontCardProps> = ({ fontFile, onRemove, onToggleSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [converting, setConverting] = useState(false);

  const toBlobPart = (buffer: ConvertedFile["buffer"]): BlobPart => {
    if (typeof buffer === "string" || buffer instanceof ArrayBuffer) {
      return buffer;
    }

    return new Uint8Array(buffer);
  };
  
  const handleDownload = async (format: FontFormat) => {
    if (!fontFile.parsedFont) return;
    setConverting(true);
    setDownloadMenuOpen(false);

    try {
      const result: ConvertedFile = await convertFont(fontFile.parsedFont, format);
      const mimeType = format === 'svg' ? 'image/svg+xml' : `font/${format}`;
      const blob = new Blob([toBlobPart(result.buffer)], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Conversion failed", e);
      alert(`Conversion to ${format.toUpperCase()} failed. Check console for details.`);
    } finally {
      setConverting(false);
    }
  };

  if (fontFile.status === 'error') {
     return (
        <div className="bg-red-50 border-2 border-accent/20 p-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 text-accent">
                  <FileType className="w-5 h-5" />
              </div>
              <div>
                  <h4 className="font-bold text-accent">{fontFile.file.name}</h4>
                  <p className="text-xs text-red-600">{fontFile.errorMsg || "Parse Error"}</p>
              </div>
           </div>
           <Button variant="ghost" size="sm" onClick={() => onRemove(fontFile.id)} className="text-accent hover:text-red-700">
             <Trash2 className="w-4 h-4" />
           </Button>
        </div>
     )
  }

  const isLoading = fontFile.status === 'loading';

  return (
    <div className={clsx(
        "bg-white border-2 transition-all duration-200 group",
        fontFile.selected ? "border-brand-500 shadow-[4px_4px_0px_0px_rgba(25,130,196,0.2)]" : "border-gray-200 hover:border-brand-500"
    )}>
      <div className="p-4 flex items-center gap-4">
        {/* Selection Checkbox */}
        {!isLoading && (
            <div 
                onClick={() => onToggleSelect(fontFile.id)}
                className={clsx(
                    "w-6 h-6 border-2 flex items-center justify-center cursor-pointer transition-colors",
                    fontFile.selected ? "bg-brand-500 border-brand-500" : "border-gray-300 bg-white hover:border-brand-500"
                )}
            >
                {fontFile.selected && <Check className="w-4 h-4 text-white" />}
            </div>
        )}

        {/* Icon */}
        <div className="w-12 h-12 bg-offwhite text-brand-500 flex items-center justify-center shrink-0 border-2 border-gray-100">
          {isLoading ? <span className="animate-spin text-lg font-bold">C</span> : <Type className="w-6 h-6" />}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-dark-900 font-bold truncate text-lg">
            {fontFile.metadata?.family || fontFile.file.name}
          </h4>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {isLoading ? 'Parsing...' : `${fontFile.metadata?.subfamily || 'Regular'} • ${fontFile.metadata?.numGlyphs} Glyphs • ${(fontFile.file.size / 1024).toFixed(1)} KB`}
          </p>
        </div>

        {/* Actions */}
        {!isLoading && (
          <div className="flex items-center gap-2">
            
            <div className="relative">
                <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                    disabled={converting}
                >
                    <Download className="w-4 h-4 mr-2" /> Convert
                    <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                </Button>

                {downloadMenuOpen && (
                    <div className="absolute right-0 mt-1 w-32 bg-white border-2 border-gray-200 shadow-xl z-10 py-1">
                        {(['ttf', 'otf', 'woff', 'woff2', 'svg', 'eot'] as FontFormat[]).map(format => (
                            <button
                                key={format}
                                onClick={() => handleDownload(format)}
                                className="w-full text-left px-4 py-2 text-sm font-medium text-dark-800 hover:bg-brand-50 hover:text-brand-600 transition-colors uppercase"
                            >
                                {format.toUpperCase()}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="h-8 w-px bg-gray-200 mx-2"></div>

            <button 
                onClick={() => setExpanded(!expanded)}
                className="p-2 text-gray-400 hover:text-brand-500 transition-colors"
                title="View Details"
            >
                {expanded ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
            </button>
            <button 
                onClick={() => onRemove(fontFile.id)}
                className="p-2 text-gray-400 hover:text-accent transition-colors"
                title="Remove"
            >
                <Trash2 className="w-5 h-5"/>
            </button>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {expanded && fontFile.metadata && (
        <div className="px-6 pb-6 pt-2 border-t-2 border-gray-100 bg-white">
            
           {/* Preview Text */}
           <div className="mt-4 mb-2">
             <label className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2 block">Preview</label>
             <div className="bg-offwhite border border-gray-200 p-8 overflow-hidden relative">
                <style>{`
                  @font-face {
                    font-family: 'Preview-${fontFile.id}';
                    src: url('${fontFile.previewUrl}');
                  }
                `}</style>
                <p 
                    style={{ fontFamily: `'Preview-${fontFile.id}', sans-serif` }} 
                    className="text-dark-900 text-4xl break-words leading-tight outline-none"
                    contentEditable
                    suppressContentEditableWarning
                >
                    The quick brown fox jumps over the lazy dog.
                </p>
                <div className="mt-4 text-gray-400 text-lg">1234567890 &!@#%</div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};
