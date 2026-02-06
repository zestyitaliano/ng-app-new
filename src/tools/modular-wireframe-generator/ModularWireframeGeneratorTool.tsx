
import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SECTION_TYPES, SECTION_STYLE_MAP } from './constants';
import { SectionData, SectionType } from './types';
import { WireframeRenderer } from './components/WireframeRenderer';

// Icons
const ArrowUpIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
const ArrowDownIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const TrashIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const UndoIcon = () => <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>;
const RedoIcon = () => <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" /></svg>;
const ChevronLeftIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ChevronRightIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const PhotoIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const DocumentIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const FileCodeIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;

export default function ModularWireframeGeneratorTool() {
  // History State Management
  const [history, setHistory] = useState<{
    past: SectionData[][];
    present: SectionData[];
    future: SectionData[][];
  }>({
    past: [],
    present: [],
    future: []
  });

  const sections = history.present;
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const [selectedType, setSelectedType] = useState<SectionType>(SectionType.Hero);
  const [isExporting, setIsExporting] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Helper to update state and push to history
  const setSectionsWithHistory = (newSections: SectionData[]) => {
    setHistory(curr => ({
      past: [...curr.past, curr.present],
      present: newSections,
      future: []
    }));
  };

  const handleUndo = () => {
    if (!canUndo) return;
    setHistory(curr => {
      const previous = curr.past[curr.past.length - 1];
      const newPast = curr.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [curr.present, ...curr.future]
      };
    });
  };

  const handleRedo = () => {
    if (!canRedo) return;
    setHistory(curr => {
      const next = curr.future[0];
      const newFuture = curr.future.slice(1);
      return {
        past: [...curr.past, curr.present],
        present: next,
        future: newFuture
      };
    });
  };

  // Helper to create a new section
  const createSection = (type: SectionType): SectionData => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      variation: Math.floor(Math.random() * 35) + 1, // Random 1-35
    };
  };

  // Add section manually
  const handleGenerate = () => {
    const newSection = createSection(selectedType);
    setSectionsWithHistory([...sections, newSection]);
    // Scroll to bottom after render
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Move section
  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setSectionsWithHistory(newSections);
  };

  // Cycle variation
  const changeVariation = (index: number, direction: 'next' | 'prev') => {
    const newSections = [...sections];
    const section = newSections[index];
    const maxVariations = 35;

    let newVariation = section.variation;
    if (direction === 'next') {
        newVariation = newVariation >= maxVariations ? 1 : newVariation + 1;
    } else {
        newVariation = newVariation <= 1 ? maxVariations : newVariation - 1;
    }

    newSections[index] = { ...section, variation: newVariation };
    setSectionsWithHistory(newSections);
  };

  // Delete section
  const deleteSection = (id: string) => {
    setSectionsWithHistory(sections.filter(s => s.id !== id));
  };

  // Clear Canvas Logic
  const handleClearCanvas = () => {
    if (sections.length === 0) return;
    setSectionsWithHistory([]);
  };

  // Export Logic
  const handleExportImage = async () => {
    if (!canvasRef.current || sections.length === 0) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(canvasRef.current, { 
        useCORS: true, 
        scale: 2,
        ignoreElements: (element) => {
          return element.hasAttribute('data-wireframe-controls') || element.hasAttribute('data-wireframe-label');
        }
      });
      const link = document.createElement('a');
      link.download = 'wireframe-design.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Export failed", error);
    }
    setIsExporting(false);
  };

  const handleExportPDF = async () => {
    if (!canvasRef.current || sections.length === 0) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(canvasRef.current, { 
        useCORS: true, 
        scale: 2,
        ignoreElements: (element) => {
          return element.hasAttribute('data-wireframe-controls') || element.hasAttribute('data-wireframe-label');
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height] 
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('wireframe-design.pdf');
    } catch (error) {
      console.error("PDF Export failed", error);
    }
    setIsExporting(false);
  };

  const handleExportHTML = () => {
    if (!canvasRef.current || sections.length === 0) return;
    
    const clone = canvasRef.current.cloneNode(true) as HTMLElement;
    
    const controls = clone.querySelectorAll('[data-wireframe-controls]');
    controls.forEach(el => el.remove());
    const labels = clone.querySelectorAll('[data-wireframe-label]');
    labels.forEach(el => el.remove());

    const sectionContainers = clone.querySelectorAll('[data-wireframe-container]');
    sectionContainers.forEach((el) => {
      (el as HTMLElement).style.borderLeftWidth = '0px';
      (el as HTMLElement).style.borderColor = 'transparent';
      (el as HTMLElement).style.borderWidth = '0px';
    });

    const contentHtml = clone.innerHTML;
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Wireframe</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Syne', sans-serif; background-color: #f8f9fa; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div class="max-w-5xl mx-auto space-y-8 p-12">
    ${contentHtml}
  </div>
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wireframe-design.html';
    link.click();
  };

  // Keyboard shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, history]);

  return (
    <div className="flex flex-col h-screen md:flex-row bg-[#f8f9fa] overflow-hidden font-['Syne']">
      
      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg z-20">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-[#ff595e]">●</span> Wireframer
          </h1>
          <p className="text-xs text-gray-400 mt-1">Modular Low-Fi Generator</p>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3 border-b border-gray-100 flex gap-2 bg-gray-50/50">
          <button 
            onClick={handleUndo} 
            disabled={!canUndo}
            className={`flex-1 flex items-center justify-center py-2 px-3 text-xs font-bold uppercase rounded border transition-colors ${
              canUndo 
                ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm' 
                : 'bg-gray-100 border-transparent text-gray-400 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <UndoIcon /> Undo
          </button>
          <button 
            onClick={handleRedo} 
            disabled={!canRedo}
            className={`flex-1 flex items-center justify-center py-2 px-3 text-xs font-bold uppercase rounded border transition-colors ${
              canRedo 
                ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm' 
                : 'bg-gray-100 border-transparent text-gray-400 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Shift+Z)"
          >
             Redo <RedoIcon />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-8">
          
          {/* Manual Generator */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Add Section</h2>
            <div className="space-y-2">
              {SECTION_TYPES.map((item) => (
                <label 
                  key={item.value} 
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedType === item.value ? 'bg-[#1982c4] bg-opacity-5 border-[#1982c4] text-[#1982c4]' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <input 
                    type="radio" 
                    name="sectionType" 
                    value={item.value} 
                    checked={selectedType === item.value}
                    onChange={() => setSelectedType(item.value as SectionType)}
                    className="w-4 h-4 text-[#1982c4] focus:ring-[#1982c4]"
                  />
                  <span className="font-medium">{item.label}</span>
                </label>
              ))}
            </div>
            
            <button 
              onClick={handleGenerate}
              className="w-full py-4 mt-4 bg-[#1982c4] hover:bg-[#156a9e] text-white font-bold text-lg rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-2xl">+</span> Generate
            </button>
          </div>

          {/* Export Controls */}
          <div className="pt-6 border-t border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Export Design</h2>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={handleExportImage}
                disabled={sections.length === 0 || isExporting}
                className="flex flex-col items-center justify-center p-2 rounded border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
                title="Export as PNG"
              >
                <PhotoIcon />
                <span className="text-[10px] mt-1 font-bold text-gray-600">Image</span>
              </button>
              <button 
                onClick={handleExportPDF}
                disabled={sections.length === 0 || isExporting}
                className="flex flex-col items-center justify-center p-2 rounded border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
                title="Export as PDF"
              >
                <DocumentIcon />
                <span className="text-[10px] mt-1 font-bold text-gray-600">PDF</span>
              </button>
              <button 
                onClick={handleExportHTML}
                disabled={sections.length === 0}
                className="flex flex-col items-center justify-center p-2 rounded border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
                title="Export as HTML"
              >
                <FileCodeIcon />
                <span className="text-[10px] mt-1 font-bold text-gray-600">HTML</span>
              </button>
            </div>
          </div>

          {/* Canvas Stats & Clear */}
          <div className="pt-6 border-t border-gray-100">
             <div className="flex justify-between items-center mb-3">
               <div className="text-xs text-gray-400">
                  Current Stack: {sections.length} sections
               </div>
             </div>
             
             <button 
               onClick={handleClearCanvas}
               disabled={sections.length === 0}
               className={`w-full py-2 px-3 text-xs font-bold uppercase rounded border transition-colors flex items-center justify-center gap-2 ${
                  sections.length > 0 
                  ? 'border-red-200 text-red-500 hover:bg-red-50' 
                  : 'border-gray-100 text-gray-300 cursor-not-allowed'
               }`}
             >
               <TrashIcon /> Clear Canvas
             </button>
          </div>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 overflow-y-auto bg-[#efefef] p-4 md:p-12 scroll-smooth">
        <div ref={canvasRef} className="max-w-5xl mx-auto space-y-8 min-h-full pb-20">
          
          {sections.length === 0 && (
            <div className="flex flex-col items-center justify-center h-96 text-gray-400 border-2 border-dashed border-gray-300 rounded-xl" data-wireframe-controls="true">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                 <span className="text-2xl">?</span>
              </div>
              <p className="text-lg">Canvas is empty.</p>
              <p className="text-sm opacity-60">Generate a section to start building.</p>
            </div>
          )}

          {sections.map((section, index) => {
            const typeColor = SECTION_STYLE_MAP[section.type] || '#ccc';
            return (
              <div 
                key={section.id} 
                className="group relative bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
                style={{ aspectRatio: '16/9' }}
              >
                {/* Section Controls Overlay */}
                <div data-wireframe-controls="true" className="absolute top-4 right-4 z-50 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 p-1 rounded-lg shadow-md border border-gray-200 backdrop-blur-sm">
                  
                  <div className="flex items-center justify-between gap-1 pb-2 border-b border-gray-200">
                    <button 
                      onClick={() => changeVariation(index, 'prev')} 
                      className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"
                      title="Previous Variation"
                    >
                      <ChevronLeftIcon />
                    </button>
                    <span className="text-[10px] font-bold text-gray-400 select-none w-6 text-center">V{section.variation}</span>
                    <button 
                      onClick={() => changeVariation(index, 'next')} 
                      className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"
                      title="Next Variation"
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>

                  <button 
                    onClick={() => moveSection(index, 'up')} 
                    disabled={index === 0}
                    className="p-2 hover:bg-[#1982c4] hover:text-white rounded disabled:opacity-30 transition-colors"
                    title="Move Up"
                  >
                    <ArrowUpIcon />
                  </button>
                  <button 
                    onClick={() => moveSection(index, 'down')} 
                    disabled={index === sections.length - 1}
                    className="p-2 hover:bg-[#1982c4] hover:text-white rounded disabled:opacity-30 transition-colors"
                    title="Move Down"
                  >
                    <ArrowDownIcon />
                  </button>
                  <div className="h-px bg-gray-300 my-1" />
                  <button 
                    onClick={() => deleteSection(section.id)}
                    className="p-2 hover:bg-[#ff595e] hover:text-white rounded text-[#ff595e] transition-colors"
                    title="Remove Section"
                  >
                    <TrashIcon />
                  </button>
                </div>

                {/* Wireframe Content */}
                <div 
                  data-wireframe-container="true"
                  className="w-full h-full overflow-hidden border-2 transition-colors relative"
                  style={{ 
                    borderColor: typeColor,
                    borderLeftWidth: '8px', 
                  }}
                >
                   <div 
                     data-wireframe-label="true"
                     className="absolute top-0 left-0 text-[10px] font-bold px-3 py-1 text-white uppercase tracking-wider z-20 shadow-sm"
                     style={{ backgroundColor: typeColor }}
                   >
                      {section.type} • V{section.variation}
                   </div>
                   
                   <WireframeRenderer data={section} />
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </main>
    </div>
  );
}