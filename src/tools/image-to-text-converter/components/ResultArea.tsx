import React, { useEffect, useRef, useState } from "react";
import { OCRLine } from "../types";
import { Button } from "../../../components/Button";

interface ResultAreaProps {
  text: string;
  ocrLines: OCRLine[];
  onTextChange: (text: string) => void;
  onClear: () => void;
  isCleanMode: boolean;
  onToggleMode: () => void;
  confidence: number | null;
}

const ResultArea: React.FC<ResultAreaProps> = ({
  text,
  ocrLines,
  onTextChange,
  onClear,
  isCleanMode,
  onToggleMode,
  confidence,
}) => {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [showHighlights, setShowHighlights] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current && !showHighlights) {
      textAreaRef.current.focus();
    }
  }, [showHighlights]);

  useEffect(() => {
    if (isCleanMode) setShowHighlights(false);
  }, [isCleanMode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback("Copied!");
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback("Failed to copy");
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const CONFIDENCE_WARNING = 80;
  const CONFIDENCE_DANGER = 60;
  const OVERALL_CONFIDENCE_THRESHOLD = 70;

  const getHighlightClass = (conf: number) => {
    if (conf < CONFIDENCE_DANGER)
      return "bg-red-100 text-red-900 border-b border-red-200";
    if (conf < CONFIDENCE_WARNING)
      return "bg-yellow-100 text-yellow-900 border-b border-yellow-200";
    return "";
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white rounded-none shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between px-4 py-3 bg-offwhite border-b border-slate-200 gap-3">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Format Toggle */}
            <div className="flex bg-slate-200 p-1 rounded-none">
              <button
                type="button"
                onClick={() => isCleanMode && onToggleMode()}
                className={[
                  "px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-none transition-all",
                  !isCleanMode
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                ].join(" ")}
              >
                Original Layout
              </button>

              <button
                type="button"
                onClick={() => !isCleanMode && onToggleMode()}
                className={[
                  "px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-none transition-all",
                  isCleanMode
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                ].join(" ")}
              >
                Clean Text
              </button>
            </div>

            {/* Confidence Toggle */}
            {!isCleanMode && (
              <div className="flex items-center ml-2 pl-2 border-l border-slate-300 h-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={showHighlights}
                      onChange={() => setShowHighlights(!showHighlights)}
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary1" />
                  </div>
                  <span
                    className={[
                      "text-xs font-bold uppercase tracking-wide transition-colors",
                      showHighlights ? "text-slate-900" : "text-slate-500",
                    ].join(" ")}
                  >
                    Show Confidence
                  </span>
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500 self-end xl:self-auto items-center">
            {confidence !== null && (
              <div className="flex items-center gap-1" title="OCR Confidence Score">
                <span>Confidence:</span>
                <span
                  className={[
                    "font-bold",
                    confidence > 80
                      ? "text-green-600"
                      : confidence > 50
                      ? "text-yellow-600"
                      : "text-red-600",
                  ].join(" ")}
                >
                  {Math.round(confidence)}%
                </span>
              </div>
            )}

            <div className="hidden xl:block w-px h-3 bg-slate-300" />
            <span>{wordCount} words</span>
            <span>{charCount} chars</span>
          </div>
        </div>

        {/* Global warning */}
        {confidence !== null && confidence < OVERALL_CONFIDENCE_THRESHOLD && (
          <div className="px-4 py-2 bg-orange-50 border-b border-orange-100 text-orange-800 text-xs flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-bold">Notice:</span>
            <span>
              Low confidence score ({Math.round(confidence)}%). The extracted text
              may contain errors.
            </span>
          </div>
        )}

        {/* Editor / Highlight View */}
        <div className="relative w-full h-64">
          {showHighlights && !isCleanMode ? (
            <>
              <div className="absolute inset-0 w-full h-full p-4 overflow-auto font-mono text-sm leading-relaxed whitespace-pre-wrap bg-white text-slate-800">
                {ocrLines.length > 0 ? (
                  ocrLines.map((line, lineIdx) => (
                    <React.Fragment key={lineIdx}>
                      {line.words.map((word, wordIdx) => (
                        <React.Fragment key={`${lineIdx}-${wordIdx}`}>
                          <span
                            className={[
                              "rounded-[1px] px-[1px] transition-colors cursor-help",
                              getHighlightClass(word.confidence),
                            ].join(" ")}
                            title={`Confidence: ${Math.round(word.confidence)}%`}
                          >
                            {word.text}
                          </span>
                          {wordIdx < line.words.length - 1 ? " " : ""}
                        </React.Fragment>
                      ))}
                      {"\n"}
                    </React.Fragment>
                  ))
                ) : (
                  <span>{text}</span>
                )}
              </div>

              <div className="absolute top-2 right-4 pointer-events-none">
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-slate-200 shadow-sm opacity-80">
                  Read Only View
                </span>
              </div>
            </>
          ) : (
            <textarea
              ref={textAreaRef}
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/20 resize-none font-mono text-sm leading-relaxed"
              placeholder="Extracted text will appear here..."
            />
          )}
        </div>

        {/* Legend */}
        {showHighlights && !isCleanMode && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-center gap-4">
            <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
              Legend:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-red-100 border border-red-200 rounded-[1px]" />
              <span>&lt; {CONFIDENCE_DANGER}% (Low)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded-[1px]" />
              <span>
                {CONFIDENCE_DANGER}-{CONFIDENCE_WARNING}% (Medium)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <Button variant="outline" onClick={onClear} className="uppercase tracking-wide">
          Clear
        </Button>

        <Button
          variant="primary"
          onClick={handleCopy}
          className={[
            "uppercase tracking-wide min-w-[140px] gap-2",
            copyFeedback ? "bg-secondary1 text-slate-900 hover:brightness-95" : "",
          ].join(" ")}
        >
          {copyFeedback ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              {copyFeedback}
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5"
                />
              </svg>
              Copy Text
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResultArea;
