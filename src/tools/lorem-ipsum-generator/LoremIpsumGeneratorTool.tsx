import React, { useState, useEffect } from 'react';
import { GeneratorUnit } from './types';
import { generateLoremIpsum } from './services/lorem';
import Controls from './components/Controls';
import OutputDisplay from './components/OutputDisplay';

export default function LoremIpsumGeneratorTool() {
  const [amount, setAmount] = useState<number>(5);
  const [unit, setUnit] = useState<GeneratorUnit>(GeneratorUnit.PARAGRAPHS);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [asHtml, setAsHtml] = useState<boolean>(false);
  const [generatedText, setGeneratedText] = useState<string>("");

  const handleGenerate = () => {
    const text = generateLoremIpsum(amount, unit, startWithLorem, asHtml);
    setGeneratedText(text);
  };

  const handleClear = () => {
    setGeneratedText("");
  };

  // Auto-generate on first load
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary flex items-center justify-center text-white font-bold text-lg">L</div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">Lorem Ipsum Generator</h1>
            </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              GENERATE <span className="text-primary">PLACEHOLDER</span> TEXT
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Clean, reliable lorem ipsum for your designs.
            </p>
        </div>

        <Controls 
            amount={amount}
            setAmount={setAmount}
            unit={unit}
            setUnit={setUnit}
            startWithLorem={startWithLorem}
            setStartWithLorem={setStartWithLorem}
            asHtml={asHtml}
            setAsHtml={setAsHtml}
            onGenerate={handleGenerate}
        />

        <OutputDisplay 
            text={generatedText} 
            onClear={handleClear} 
        />

        <section className="mt-20 border-t border-slate-200 pt-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-wide">How it works</h3>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-offwhite p-6 border border-slate-200">
                    <div className="w-12 h-12 bg-primary text-white flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Smart Algorithm</h4>
                    <p className="text-slate-600 leading-relaxed">Uses a randomized dictionary of over 200 pseudo-Latin words combined into natural-sounding sentences.</p>
                </div>
                <div className="bg-offwhite p-6 border border-slate-200">
                    <div className="w-12 h-12 bg-secondary text-slate-900 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Web Standards</h4>
                    <p className="text-slate-600 leading-relaxed">Generates clean UTF-8 text. Byte mode calculates exact byte size using TextEncoder for accurate limits.</p>
                </div>
                <div className="bg-offwhite p-6 border border-slate-200">
                    <div className="w-12 h-12 bg-accent text-white flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Client-side Secure</h4>
                    <p className="text-slate-600 leading-relaxed">Runs entirely in your browser. No external API calls, no tracking, and works perfectly offline.</p>
                </div>
            </div>
        </section>
      </main>

      <footer className="text-center py-8 text-slate-400 text-sm font-medium">
        &copy; {new Date().getFullYear()} Lorem Ipsum Generator. Open Source.
      </footer>
    </div>
  );
}