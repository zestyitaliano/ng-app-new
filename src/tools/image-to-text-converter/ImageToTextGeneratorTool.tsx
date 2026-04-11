import React, { useState, useCallback } from 'react';
import ToolLayout from '../../components/ToolLayout';
import DropZone from './components/DropZone';
import LanguageSelector from './components/LanguageSelector';
import ProcessingOverlay from './components/ProcessingOverlay';
import ResultArea from './components/ResultArea';
import ZoomableImage from './components/ZoomableImage';
import { recognizeText } from './services/ocrService';
import { ProcessingStatus, OCRLine } from './types';
import { toolMeta } from './meta';

export default function ImageToTextGeneratorTool() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>(''); // Store original OCR result
  const [extractedText, setExtractedText] = useState<string>('');
  const [ocrLines, setOcrLines] = useState<OCRLine[]>([]); // Store structural data
  const [isCleanMode, setIsCleanMode] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('eng');

  // Helper to format text based on mode
  const applyFormatting = useCallback((text: string, clean: boolean) => {
    if (!text) return;
    
    if (clean) {
      // Clean Text: Join lines, collapse spaces, preserve paragraphs
      const cleaned = text
        .replace(/\r\n/g, '\n') // Normalize line endings
        .replace(/\n\s*\n/g, '__PARAGRAPH__') // Preserve double newlines (paragraphs)
        .replace(/\n/g, ' ') // Replace single newlines with space
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .replace(/__PARAGRAPH__/g, '\n\n') // Restore paragraphs
        .trim();
      setExtractedText(cleaned);
    } else {
      // Original Layout: Preserve line breaks as detected
      const preserved = text.replace(/\n\s*\n/g, '\n\n').trim();
      setExtractedText(preserved);
    }
  }, []);

  // Handle file selection (from DropZone)
  const handleFileSelect = useCallback((file: File) => {
    setImage(file);
    setErrorMsg(null);
    setExtractedText('');
    setRawText('');
    setOcrLines([]);
    setConfidence(null);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);

    // Start processing immediately
    processImage(file, language);
  }, [language]);

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // If we already have an image, re-process it with new language
    if (image && status !== 'processing') {
      processImage(image, lang);
    }
  };

  const processImage = async (file: File, lang: string) => {
    setStatus('processing');
    setProgress(0);
    setErrorMsg(null);
    setConfidence(null);
    setOcrLines([]);

    try {
      const result = await recognizeText(file, lang, (prog) => {
        setProgress(prog);
      });

      if (!result.text || result.text.trim().length === 0) {
        setExtractedText('');
        setRawText('');
        setErrorMsg("No text detected in this image.");
        setStatus('error');
      } else {
        setRawText(result.text);
        setConfidence(result.confidence);
        setOcrLines(result.lines);
        applyFormatting(result.text, isCleanMode);
        setStatus('success');
      }
    } catch (error) {
      setErrorMsg('Failed to extract text. Please try another image.');
      setStatus('error');
    }
  };

  const handleFormattingToggle = () => {
    const newMode = !isCleanMode;
    setIsCleanMode(newMode);
    if (rawText) {
      applyFormatting(rawText, newMode);
    }
  };

  const handleClear = () => {
    setImage(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
    setRawText('');
    setExtractedText('');
    setOcrLines([]);
    setConfidence(null);
    setStatus('idle');
    setProgress(0);
    setErrorMsg(null);
  };

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-4xl">
      <div className="flex flex-col gap-8">
        <main className="w-full bg-white rounded-none shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-6 bg-offwhite border-b border-slate-100">
           <LanguageSelector 
             selectedLanguage={language} 
             onLanguageChange={handleLanguageChange}
             disabled={status === 'processing'}
           />
           
           {status === 'idle' && (
             <DropZone onFileSelected={handleFileSelect} />
           )}
        </div>

        {/* Workspace Area */}
        {(status !== 'idle' && imagePreviewUrl) && (
          <div className="p-6 grid gap-8 lg:grid-cols-2 bg-white">
            
            {/* Left Column: Image Source */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Source Image</h3>
              <div className="relative rounded-none overflow-hidden border border-slate-200 bg-offwhite min-h-[300px] flex items-center justify-center">
                 <ZoomableImage 
                   src={imagePreviewUrl} 
                   alt="Source" 
                   className="max-w-full max-h-[500px] object-contain"
                 />
                 {status === 'processing' && (
                   <ProcessingOverlay progress={progress} />
                 )}
                 {status === 'error' && !errorMsg && (
                    <div className="absolute inset-0 bg-accent/10 flex items-center justify-center text-accent font-bold">
                      Processing failed
                    </div>
                 )}
              </div>
              {/* If error message exists, show below image */}
              {errorMsg && (
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-none text-accent text-sm flex items-start gap-3">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold">Error</p>
                      <p>{errorMsg}</p>
                    </div>
                    <button onClick={handleClear} className="ml-auto text-accent hover:text-red-700 underline text-xs font-bold uppercase tracking-wide">
                      Try Again
                    </button>
                </div>
              )}
            </div>

            {/* Right Column: Text Result */}
            <div className="flex flex-col gap-4">
               {status === 'success' && (
                 <>
                   <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Extracted Text</h3>
                   </div>
                   <ResultArea 
                     text={extractedText} 
                     ocrLines={ocrLines}
                     onTextChange={setExtractedText}
                     onClear={handleClear}
                     isCleanMode={isCleanMode}
                     onToggleMode={handleFormattingToggle}
                     confidence={confidence}
                   />
                 </>
               )}
               {/* Placeholders for layout balance during processing */}
               {status === 'processing' && (
                 <div className="hidden lg:flex flex-col gap-4 opacity-50">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Output</h3>
                    <div className="h-64 bg-offwhite rounded-none border border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium">
                      Waiting for result...
                    </div>
                 </div>
               )}
            </div>

          </div>
        )}
        </main>

        <footer className="text-center">
          <p className="text-sm text-slate-500 bg-offwhite inline-block px-4 py-2 rounded-none border border-slate-200 shadow-sm">
            <span className="mr-2">🔒</span>
            All text extraction happens locally in your browser. Images are not uploaded or stored.
          </p>
        </footer>
      </div>
    </ToolLayout>
  );
}
