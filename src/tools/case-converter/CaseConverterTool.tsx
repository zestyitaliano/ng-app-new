import React, { useState, useCallback } from "react";
import { Copy, Trash2, ArrowRightLeft } from "lucide-react";
import { CaseType } from "./types";
import { convertText } from "./utils/textConverters";
import { Button } from "../../components/Button";
import ToolLayout from "../../components/ToolLayout";
import { Toast } from "../../components/Toast";
import { toolMeta } from "./meta";


export default function CaseConverterTool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [inputWarning, setInputWarning] = useState(false);

  const handleCaseChange = (type: CaseType) => {
    if (!inputText.trim()) {
      setInputWarning(true);
      setTimeout(() => setInputWarning(false), 1000);
      return;
    }
    setActiveCase(type);
    const result = convertText(inputText, type);
    setOutputText(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setInputText(next);

    if (activeCase && next.trim()) {
      // Real-time update if a case is already selected
      setOutputText(convertText(next, activeCase));
    } else if (!next.trim()) {
      setOutputText("");
    }
  };

  const handleCopy = useCallback(async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setToastMessage("Copied!");
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setToastMessage("Failed to copy");
      setShowToast(true);
    }
  }, [outputText]);

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setActiveCase(null);
  };

  const handleSwap = () => {
    if (!outputText) return;
    setInputText(outputText);
    setOutputText("");
    setActiveCase(null);
  };

  const caseButtons = Object.values(CaseType);

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-6xl">
      <div className="space-y-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Area */}
          <div className="flex flex-col gap-2 order-1">
            <div className="flex justify-between items-center px-1">
              <label
                htmlFor="input-text"
                className="text-sm font-bold text-slate-800 uppercase tracking-wide"
              >
                Paste your text
              </label>
              {inputWarning && (
                <span className="text-sm text-secondary2 font-bold animate-pulse">
                  Paste text first
                </span>
              )}
            </div>

            <div className="relative group">
              <textarea
                id="input-text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type or paste your content here..."
                className={`w-full h-40 lg:h-80 p-4 border-2 ${
                  inputWarning ? "border-secondary2 ring-2 ring-secondary2/10" : "border-slate-200"
                } focus:border-primary focus:ring-0 focus:outline-none transition-all resize-y text-slate-800 text-base leading-relaxed placeholder:text-slate-400 bg-white`}
                spellCheck={false}
              />
              {inputText && (
                <button
                  onClick={handleClear}
                  className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-secondary2 hover:bg-secondary2/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Clear text"
                  type="button"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Case Selection */}
          <div className="lg:col-span-2 order-2 lg:order-3">
            <div className="bg-offwhite p-6 border-2 border-transparent">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
                Choose Case
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {caseButtons.map((type) => (
                  <Button
                    key={type}
                    variant="secondary"
                    size="md"
                    isActive={activeCase === type}
                    onClick={() => handleCaseChange(type)}
                    className="w-full h-full min-h-[48px] justify-center text-center break-words leading-tight"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Area */}
          <div className="flex flex-col gap-2 order-3 lg:order-2">
            <div className="flex justify-between items-center px-1">
              <label
                htmlFor="output-text"
                className="text-sm font-bold text-slate-800 uppercase tracking-wide"
              >
                Converted text
              </label>

              <button
                onClick={handleSwap}
                disabled={!outputText}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary disabled:opacity-30 disabled:hover:text-slate-500 transition-colors uppercase tracking-wide"
                type="button"
              >
                <ArrowRightLeft size={14} />
                <span>Swap to Input</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                id="output-text"
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                placeholder="Your converted text will appear here..."
                className="w-full h-40 lg:h-80 p-4 border-2 border-slate-200 bg-offwhite focus:bg-white focus:border-primary focus:ring-0 focus:outline-none transition-all resize-y text-slate-800 text-base leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Persistent Bottom Actions */}
        <div className="sticky bottom-6 z-10 mx-auto max-w-lg">
          <div className="bg-white/90 backdrop-blur-md p-2 border-2 border-slate-100 shadow-xl flex gap-3">
            <Button
              variant="primary"
              size="lg"
              className="flex-1 shadow-md shadow-blue-100/50"
              onClick={handleCopy}
              disabled={!outputText}
            >
              <Copy className="w-5 h-5 mr-2" />
              Copy Result
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex-none px-6 hover:border-secondary2 hover:text-secondary2"
              onClick={handleClear}
              disabled={!inputText && !outputText}
            >
              Clear
            </Button>
          </div>
        </div>
        <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
      </div>
    </ToolLayout>
  );
}
