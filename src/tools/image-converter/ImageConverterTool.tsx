import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  File as FileIcon, 
  X, 
  AlertCircle, 
  Download, 
  Image as ImageIcon,
  Settings,
  FileType,
  RefreshCw,
  ArrowRight,
  Archive,
  Layers,
  Loader2,
  StopCircle
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import heic2any from 'heic2any';
import JSZip from 'jszip';

// Types
type FileStatus = 'idle' | 'converting' | 'success' | 'error';

interface ConversionTask {
  id: string;
  file: File;
  previewUrl: string | null;
  targetFormat: string;
  status: FileStatus;
  progress: number;
  resultUrl?: string;
  errorMsg?: string;
  originalSize: number;
  resultSize?: number;
}

const SUPPORTED_INPUTS = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
  'image/heic': ['.heic'],
  'image/heif': ['.heif'],
  'image/avif': ['.avif'],
  'image/tiff': ['.tiff', '.tif'],
  'image/x-adobe-dng': ['.dng', '.raw'],
  'application/pdf': ['.pdf'],
  'image/vnd.adobe.photoshop': ['.psd']
};

const ALLOWED_EXTENSIONS = Object.values(SUPPORTED_INPUTS).flat();

const OUTPUT_FORMATS = [
  { value: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
  { value: 'application/pdf', label: 'PDF', ext: 'pdf' },
];

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const getEstimatedSize = (originalSize: number, fileName: string, fileType: string, targetFormat: string): number => {
  const name = fileName.toLowerCase();
  const type = (fileType || '').toLowerCase();
  
  const isHeic = name.endsWith('.heic') || name.endsWith('.heif') || type.includes('heic') || type.includes('heif');
  const isPng = name.endsWith('.png') || type.includes('png');
  const isJpg = name.endsWith('.jpg') || name.endsWith('.jpeg') || type.includes('jpeg') || type.includes('jpg');
  const isWebp = name.endsWith('.webp') || type.includes('webp');
  const isRaw = name.endsWith('.dng') || name.endsWith('.raw') || name.endsWith('.tiff') || name.endsWith('.tif') || type.includes('tiff');
  const isPdf = name.endsWith('.pdf') || type.includes('pdf');
  const isPsd = name.endsWith('.psd') || type.includes('photoshop');
  
  let multiplier = 1.0;

  if (isHeic) {
    if (targetFormat === 'image/jpeg') multiplier = 1.5;
    else if (targetFormat === 'image/png') multiplier = 5.0;
    else if (targetFormat === 'image/webp') multiplier = 1.2;
    else if (targetFormat === 'application/pdf') multiplier = 1.5;
  } else if (isJpg) {
    if (targetFormat === 'image/jpeg') multiplier = 1.0;
    else if (targetFormat === 'image/png') multiplier = 2.5;
    else if (targetFormat === 'image/webp') multiplier = 0.8;
  } else if (isPng) {
    if (targetFormat === 'image/jpeg') multiplier = 0.4;
    else if (targetFormat === 'image/png') multiplier = 1.0;
    else if (targetFormat === 'image/webp') multiplier = 0.4;
    else if (targetFormat === 'application/pdf') multiplier = 0.4;
  } else if (isWebp) {
    if (targetFormat === 'image/jpeg') multiplier = 1.2;
    else if (targetFormat === 'image/png') multiplier = 2.5;
    else if (targetFormat === 'image/webp') multiplier = 1.0;
  } else if (isRaw || isPsd) {
    multiplier = 0.2;
  } else if (isPdf) {
    if (targetFormat === 'image/png') multiplier = 1.5;
    else multiplier = 0.8;
  }

  return Math.round(originalSize * multiplier);
};

export default function ImageConverterTool() {
  const [tasks, setTasks] = useState<ConversionTask[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [globalTarget, setGlobalTarget] = useState<string>('image/jpeg');
  const [isZipping, setIsZipping] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Batch Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalToProcess, setTotalToProcess] = useState(0);
  const cancelRef = useRef(false);

  // --- File Handling ---

  const processFile = async (file: File): Promise<string | null> => {
    try {
      if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic')) {
        try {
          // Use slightly lower quality for preview to improve performance
          const blob = await heic2any({ 
            blob: file, 
            toType: "image/jpeg",
            quality: 0.7 
          });
          return URL.createObjectURL(Array.isArray(blob) ? blob[0] : blob);
        } catch (e) {
          console.error("HEIC conversion failed for preview", e);
          return null;
        }
      }
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const onDrop = useCallback(async (e: React.DragEvent) => {
    if (isProcessing) return;
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files) as File[];
    addFiles(files);
  }, [globalTarget, isProcessing]);

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) return;
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      addFiles(files);
    }
  };

  const addFiles = async (files: File[]) => {
    const validFiles: File[] = [];
    const invalidNames: string[] = [];
    
    for (const file of files) {
      const fileName = file.name.toLowerCase();
      const isSupported = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
      
      if (isSupported) {
        validFiles.push(file);
      } else {
        invalidNames.push(file.name);
      }
    }

    if (invalidNames.length > 0) {
      setGlobalError(`Unsupported files skipped: ${invalidNames.join(', ')}`);
      setTimeout(() => setGlobalError(null), 6000);
    }

    if (validFiles.length === 0) return;

    const newTasks: ConversionTask[] = [];
    
    for (const file of validFiles) {
      const previewUrl = await processFile(file);
      newTasks.push({
        id: crypto.randomUUID(),
        file,
        previewUrl,
        targetFormat: globalTarget,
        status: 'idle',
        progress: 0,
        originalSize: file.size,
      });
    }

    setTasks(prev => [...newTasks, ...prev]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isProcessing) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeTask = (id: string) => {
    setTasks(prev => {
      const task = prev.find(t => t.id === id);
      if (task?.previewUrl) URL.revokeObjectURL(task.previewUrl);
      if (task?.resultUrl) URL.revokeObjectURL(task.resultUrl);
      return prev.filter(t => t.id !== id);
    });
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const clearCompleted = () => {
    setTasks(prev => {
      prev.forEach(t => {
        if (t.status === 'success' || t.status === 'error') {
          if (t.previewUrl) URL.revokeObjectURL(t.previewUrl);
          if (t.resultUrl) URL.revokeObjectURL(t.resultUrl);
        }
      });
      return prev.filter(t => t.status !== 'success' && t.status !== 'error');
    });
    setSelectedIds(new Set());
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds(prev => {
      if (tasks.length > 0 && prev.size === tasks.length) return new Set();
      return new Set(tasks.map(t => t.id));
    });
  };

  const cancelProcessing = () => {
    cancelRef.current = true;
  };

  // --- Conversion Logic ---

  const convertToImage = async (file: File, targetMime: string): Promise<Blob> => {
    // Handle HEIC/HEIF conversion first if needed
    let workingBlob: Blob = file;

    const lowerName = file.name.toLowerCase();
    const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || lowerName.endsWith('.heic') || lowerName.endsWith('.heif');

    if (isHeic) {
      const converted = await heic2any({
        blob: file,
        toType: targetMime === 'application/pdf' ? 'image/jpeg' : targetMime,
        quality: 0.95,
      });
      workingBlob = Array.isArray(converted) ? converted[0] : converted;
    }

    if (targetMime === 'image/jpeg' || targetMime === 'image/png' || targetMime === 'image/webp') {
      // Convert using canvas for most image types
      const img = new Image();
      const url = URL.createObjectURL(workingBlob);
      try {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = url;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas not supported');

        // White background for JPEG
        if (targetMime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('Conversion failed'))),
            targetMime,
            targetMime === 'image/jpeg' ? 0.92 : undefined
          );
        });

        return blob;
      } finally {
        URL.revokeObjectURL(url);
      }
    }

    throw new Error(`Unsupported target format: ${targetMime}`);
  };

  const convertToPDF = async (file: File): Promise<Blob> => {
    // Convert image to PDF (single page)
    const imgBlob = await convertToImage(file, 'image/jpeg');
    const imgUrl = URL.createObjectURL(imgBlob);

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image for PDF'));
        img.src = imgUrl;
      });

      const pdf = new jsPDF({
        orientation: img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [img.naturalWidth, img.naturalHeight],
      });

      pdf.addImage(img, 'JPEG', 0, 0, img.naturalWidth, img.naturalHeight, undefined, 'FAST');
      const out = pdf.output('blob');
      return out;
    } finally {
      URL.revokeObjectURL(imgUrl);
    }
  };

  const convertFile = async (task: ConversionTask): Promise<{ blob: Blob; ext: string }> => {
    const target = task.targetFormat;
    const fmt = OUTPUT_FORMATS.find(f => f.value === target);
    if (!fmt) throw new Error('Invalid target format');

    if (target === 'application/pdf') {
      const blob = await convertToPDF(task.file);
      return { blob, ext: fmt.ext };
    }

    const blob = await convertToImage(task.file, target);
    return { blob, ext: fmt.ext };
  };

  const convertBatch = async () => {
    const toProcessIds = selectedIds.size > 0
      ? Array.from(selectedIds)
      : tasks.filter(t => t.status === 'idle').map(t => t.id);

    const queue = tasks.filter(t => toProcessIds.includes(t.id) && t.status === 'idle');
    if (queue.length === 0) return;

    cancelRef.current = false;
    setIsProcessing(true);
    setProcessedCount(0);
    setTotalToProcess(queue.length);

    for (let i = 0; i < queue.length; i++) {
      if (cancelRef.current) break;

      const task = queue[i];
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'converting', progress: 10, errorMsg: undefined } : t));

      try {
        const { blob, ext } = await convertFile(task);
        const resultUrl = URL.createObjectURL(blob);

        setTasks(prev => prev.map(t => t.id === task.id ? {
          ...t,
          status: 'success',
          progress: 100,
          resultUrl,
          resultSize: blob.size,
        } : t));
      } catch (err: any) {
        setTasks(prev => prev.map(t => t.id === task.id ? {
          ...t,
          status: 'error',
          progress: 0,
          errorMsg: err?.message || 'Conversion failed',
        } : t));
      }

      setProcessedCount(c => c + 1);
    }

    setIsProcessing(false);
  };

  const downloadSingle = (task: ConversionTask) => {
    if (!task.resultUrl) return;

    const fmt = OUTPUT_FORMATS.find(f => f.value === task.targetFormat);
    const ext = fmt?.ext || 'out';

    const baseName = task.file.name.replace(/\.[^/.]+$/, '');
    const a = document.createElement('a');
    a.href = task.resultUrl;
    a.download = `${baseName}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadBatch = async () => {
    const successTasks = tasks.filter(t => t.status === 'success' && t.resultUrl);
    if (successTasks.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();

      const selectedSuccess = selectedIds.size > 0
        ? successTasks.filter(t => selectedIds.has(t.id))
        : successTasks;

      for (const t of selectedSuccess) {
        const fmt = OUTPUT_FORMATS.find(f => f.value === t.targetFormat);
        const ext = fmt?.ext || 'out';
        const baseName = t.file.name.replace(/\.[^/.]+$/, '');

        const res = await fetch(t.resultUrl!);
        const blob = await res.blob();
        zip.file(`${baseName}.${ext}`, blob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `converted-files.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    } finally {
      setIsZipping(false);
    }
  };

  const successCount = tasks.filter(t => t.status === 'success').length;
  const isSelectionMode = selectedIds.size > 0;

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="text-[#1982c4]" size={22} />
            <div>
              <h1 className="text-lg font-bold leading-tight">Image Converter</h1>
              <p className="text-sm text-gray-500 -mt-0.5">Convert images to JPG, PNG, WebP, or PDF</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <FileIcon size={14} />
              Batch mode
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        {/* Error */}
        {globalError && (
          <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-none flex items-center gap-2">
            <AlertCircle size={18} />
            <span className="text-sm">{globalError}</span>
          </div>
        )}

        {/* Drop Area */}
        <div
          onDrop={onDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-none p-8 transition-all
            ${isDragging ? 'border-[#1982c4] bg-[#1982c4]/5' : 'border-gray-300 bg-[#efefef]'}
            ${isProcessing ? 'opacity-60 pointer-events-none' : ''}
          `}
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-none bg-white flex items-center justify-center text-[#1982c4]">
              <Upload size={26} />
            </div>
            <div>
              <h2 className="text-base font-semibold">Drop files here</h2>
              <p className="text-sm text-gray-500 mt-1">
                Supported: {ALLOWED_EXTENSIONS.join(', ')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <label className="inline-flex items-center justify-center px-4 py-2 bg-[#1982c4] hover:bg-[#156a9e] text-white font-medium rounded-none cursor-pointer transition-colors">
                <span className="flex items-center gap-2">
                  <FileIcon size={18} />
                  Choose files
                </span>
                <input type="file" multiple className="hidden" onChange={onFileSelect} accept={ALLOWED_EXTENSIONS.join(',')} disabled={isProcessing} />
              </label>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        {tasks.length > 0 && (
           <div className="bg-[#efefef] rounded-none p-4 border border-transparent flex flex-col xl:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Batch Settings / Progress Section */}
              {isProcessing ? (
                 <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1 w-full">
                       <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2">
                              <Loader2 size={16} className="animate-spin text-[#1982c4]" />
                              Converting batch...
                          </span>
                          <span>{processedCount} / {totalToProcess}</span>
                       </div>
                       <div className="w-full bg-gray-200 rounded-none h-2.5 overflow-hidden">
                          <div 
                             className="bg-[#1982c4] h-full transition-all duration-300 ease-out"
                             style={{ width: `${(processedCount / totalToProcess) * 100}%` }}
                          />
                       </div>
                    </div>
                    <button 
                       onClick={cancelProcessing}
                       className="px-6 py-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 font-medium rounded-none flex items-center gap-2 transition-colors"
                    >
                       <StopCircle size={18} />
                       Cancel
                    </button>
                 </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                     
                     {/* Select All Checkbox */}
                     <div className="flex items-center gap-3 px-2">
                       <label className="flex items-center gap-2 cursor-pointer select-none">
                         <input 
                           type="checkbox"
                           checked={tasks.length > 0 && selectedIds.size === tasks.length}
                           onChange={toggleSelectAll}
                           className="w-4 h-4 text-[#1982c4] rounded border-gray-300 focus:ring-[#1982c4] cursor-pointer"
                         />
                         <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                           Select All
                         </span>
                       </label>
                       {selectedIds.size > 0 && (
                         <button 
                            onClick={() => setSelectedIds(new Set())}
                            className="text-xs text-gray-500 hover:text-[#1982c4] underline"
                         >
                           Deselect All
                         </button>
                       )}
                     </div>

                     <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                     <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-none border border-transparent w-full sm:w-auto transition-colors focus-within:border-[#1982c4]">
                        <Layers size={18} className="text-[#1982c4]" />
                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Convert {isSelectionMode ? 'selected' : 'all'} to:</span>
                        <select 
                          value={globalTarget}
                          onChange={(e) => {
                            const fmt = e.target.value;
                            setGlobalTarget(fmt);
                            // If selected tasks exist, update only them, otherwise update all pending
                            const targetIds = isSelectionMode ? selectedIds : new Set(tasks.map(t => t.id));
                            setTasks(prev => prev.map(t => (targetIds.has(t.id) && t.status === 'idle') ? { ...t, targetFormat: fmt } : t));
                          }}
                          className="bg-transparent border-none text-[#1982c4] text-sm font-bold focus:ring-0 cursor-pointer py-0 pl-2 pr-8 outline-none"
                        >
                          {OUTPUT_FORMATS.map(fmt => (
                            <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
                          ))}
                        </select>
                     </div>
                     
                     <div className="hidden xl:block h-8 w-px bg-gray-300"></div>
                     <div className="text-sm text-gray-500 hidden xl:block">
                        {selectedIds.size > 0 ? `${selectedIds.size} selected` : `${tasks.filter(t => t.status === 'idle').length} pending, ${tasks.filter(t => t.status === 'success').length} done`}
                     </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex items-center gap-2 w-full xl:w-auto justify-end">
                    {(successCount > 0 || isSelectionMode) && (
                      <button
                        onClick={downloadBatch}
                        disabled={isZipping || (!isSelectionMode && successCount === 0) || (isSelectionMode && Array.from(selectedIds).every(id => tasks.find(t => t.id === id)?.status !== 'success'))}
                        className="flex-1 sm:flex-none px-4 py-2 bg-[#ffca3a] hover:bg-[#e6b42f] text-black font-medium rounded-none shadow-none transition-all active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isZipping ? (
                          <RefreshCw size={18} className="animate-spin" />
                        ) : (
                          <Archive size={18} />
                        )}
                        Download {isSelectionMode ? 'Selected' : 'All'}
                      </button>
                    )}
                    
                    <button 
                      onClick={clearCompleted}
                      className="flex-1 sm:flex-none px-4 py-2 text-sm text-gray-600 hover:text-[#ff595e] hover:bg-white rounded-none transition-colors"
                    >
                      Clear Done
                    </button>
                    <button 
                      onClick={convertBatch}
                      disabled={tasks.every(t => t.status === 'success')}
                      className="flex-1 sm:flex-none px-6 py-2 bg-[#1982c4] hover:bg-[#156a9e] text-white font-medium rounded-none shadow-none transition-all active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <RefreshCw size={18} />
                      Convert {isSelectionMode ? 'Selected' : 'All'}
                    </button>
                  </div>
                </>
              )}
           </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              className={`
                group bg-[#efefef] rounded-none p-4 border flex flex-col sm:flex-row items-center gap-4 transition-all
                ${selectedIds.has(task.id) ? 'border-[#1982c4] bg-[#1982c4]/5' : 'border-transparent hover:border-[#1982c4]/20'}
                ${isProcessing && task.status === 'idle' && !selectedIds.has(task.id) ? 'opacity-50' : ''}
              `}
            >
              {/* Checkbox */}
              <div className="hidden sm:flex items-center justify-center pl-2">
                 <input 
                   type="checkbox"
                   checked={selectedIds.has(task.id)}
                   onChange={() => toggleSelection(task.id)}
                   disabled={isProcessing}
                   className="w-4 h-4 text-[#1982c4] rounded border-gray-300 focus:ring-[#1982c4] cursor-pointer disabled:opacity-50"
                 />
              </div>
              
              {/* Preview */}
              <div 
                className="relative w-full sm:w-20 h-20 bg-white rounded-none overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => !isProcessing && toggleSelection(task.id)}
              >
                {task.previewUrl ? (
                  <img src={task.previewUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FileType size={32} />
                  </div>
                )}
                
                {/* Mobile Checkbox Overlay */}
                <div className="absolute top-2 left-2 sm:hidden">
                    <input 
                       type="checkbox"
                       checked={selectedIds.has(task.id)}
                       onChange={(e) => { e.stopPropagation(); toggleSelection(task.id); }}
                       disabled={isProcessing}
                       className="w-5 h-5 text-[#1982c4] rounded border-gray-300 focus:ring-[#1982c4]"
                    />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 text-center sm:text-left cursor-default">
                <h4 className="font-medium text-gray-900 truncate" title={task.file.name}>{task.file.name}</h4>
                <p className="text-sm text-gray-500 flex items-center justify-center sm:justify-start gap-2">
                  <span>{formatBytes(task.originalSize)}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="uppercase">{task.file.name.split('.').pop()}</span>
                  
                  {task.status === 'idle' && (
                    <>
                        <ArrowRight size={12} className="text-gray-300" />
                        <span className="text-gray-400" title="Estimated output size">~{formatBytes(getEstimatedSize(task.originalSize, task.file.name, task.file.type, task.targetFormat))}</span>
                    </>
                  )}
                </p>
                {task.errorMsg && (
                  <p className="text-sm text-[#ff595e] mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {task.errorMsg}
                  </p>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
                {task.status === 'success' && task.resultUrl && (
                  <button 
                    onClick={() => downloadSingle(task)}
                    className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-none transition-colors flex items-center gap-2"
                  >
                    <Download size={18} />
                    Download
                  </button>
                )}

                <button 
                  onClick={() => removeTask(task.id)}
                  disabled={isProcessing}
                  className="p-2 text-gray-400 hover:text-[#ff595e] hover:bg-white rounded-none transition-colors disabled:opacity-50"
                  title="Remove"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}

          {tasks.length === 0 && !isDragging && (
             <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-[#efefef] mb-4 text-[#1982c4]">
                   <ImageIcon size={32} />
                </div>
                <h3 className="text-gray-500 font-medium">No files added yet</h3>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}