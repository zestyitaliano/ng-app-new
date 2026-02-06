import React, { useState } from 'react';

interface OutputDisplayProps {
  text: string;
  onClear: () => void;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ text, onClear }) => {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch (err) {
      setCopyFeedback('Failed to copy');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lipsum-generated.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-slate-200 flex flex-col overflow-hidden h-full shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-offwhite border-b border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Result</h3>
        <div className="flex gap-2">
           <button
            onClick={handleCopy}
            disabled={!text}
            className="text-xs font-bold px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:text-primary hover:border-primary transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          >
            {copyFeedback ? (
               <>
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="text-green-600"><polyline points="20 6 9 17 4 12"/></svg>
               {copyFeedback}
               </>
            ) : (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><rect x="9" y="9" width="13" height="13" rx="0" ry="0"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copy
                </>
            )}
          </button>
           <button
            onClick={handleDownload}
            disabled={!text}
            className="text-xs font-bold px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:text-primary hover:border-primary transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </button>
           <button
            onClick={onClear}
            disabled={!text}
            className="text-xs font-bold px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:text-white hover:bg-accent hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="relative flex-grow min-h-[300px] lg:min-h-[500px]">
        <textarea
          readOnly
          value={text}
          className="w-full h-full p-6 resize-none outline-none text-slate-700 leading-relaxed font-mono text-sm bg-white"
          placeholder="Generated text will appear here..."
        />
      </div>
       <div className="bg-offwhite px-4 py-2 text-xs font-bold text-slate-400 border-t border-slate-200 flex justify-between uppercase">
          <span>{text.length} chars</span>
          <span>{new TextEncoder().encode(text).length} bytes</span>
       </div>
    </div>
  );
};

export default OutputDisplay;