import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Bold,
  Check,
  Copy,
  Italic,
  Mic,
  MicOff,
  Minus,
  Plus,
  Redo,
  Search,
  Square,
  Trash2,
  Underline,
  Undo,
  Volume2,
  X,
} from "lucide-react";

import ToolLayout from "../../components/ToolLayout";
import { toolMeta } from "./meta";
import { useHistory } from "./hooks/useHistory";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";

const replaceInTextNodes = (node: Node, find: string, replace: string) => {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.nodeValue) {
      const escapeRegExp = (value: string) =>
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapeRegExp(find), "gi");
      node.nodeValue = node.nodeValue.replace(regex, replace);
    }
  } else {
    node.childNodes.forEach((child) => replaceInTextNodes(child, find, replace));
  }
};

export default function DictateTool() {
  const {
    isListening,
    isTranscribing,
    transcript,
    interimTranscript,
    toggleListening,
    resetTranscript,
    setTranscript,
    error,
    isSupported,
  } = useSpeechRecognition();

  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const endOfTextRef = useRef<HTMLDivElement>(null);

  const { undo, redo, record, debouncedRecord, canUndo, canRedo } =
    useHistory("");
  const {
    isSpeaking,
    toggleSpeaking,
    rate,
    setRate,
    isSupported: isTTSSupported,
  } = useSpeechSynthesis();
  const isUndoRedoRef = useRef(false);

  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }

    debouncedRecord(transcript);
  }, [transcript, debouncedRecord]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== transcript) {
      editorRef.current.innerHTML = transcript;
    }
  }, [transcript]);

  useEffect(() => {
    if (isListening && endOfTextRef.current) {
      endOfTextRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcript, interimTranscript, isListening]);

  const applyFormat = (command: string) => {
    document.execCommand(command, false, undefined);

    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setTranscript(newHtml);
      record(newHtml);
      isUndoRedoRef.current = true;
    }

    editorRef.current?.focus();
  };

  const handleReset = () => {
    resetTranscript();
    record("");
    isUndoRedoRef.current = true;
  };

  const handleUndo = () => {
    const previous = undo();
    if (previous !== null) {
      isUndoRedoRef.current = true;
      setTranscript(previous);
    }
  };

  const handleRedo = () => {
    const next = redo();
    if (next !== null) {
      isUndoRedoRef.current = true;
      setTranscript(next);
    }
  };

  const handleReplaceAll = () => {
    if (!findText || !transcript) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = transcript;
    replaceInTextNodes(tempDiv, findText, replaceText);
    const newHtml = tempDiv.innerHTML;
    setTranscript(newHtml);
    record(newHtml);
    isUndoRedoRef.current = true;
  };

  const handleCopy = async () => {
    if (!editorRef.current) return;

    const html = editorRef.current.innerHTML;
    const text = editorRef.current.innerText;
    if (!text) return;

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
    } catch {
      await navigator.clipboard.writeText(text);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 48));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-5xl">
      <div className="space-y-6 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center bg-[#1982c4] text-white shadow-sm">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                Voice Workspace
              </div>
              <div className="text-lg font-black uppercase tracking-wide text-slate-900">
                Dictation Editor
              </div>
            </div>
          </div>

          <div className="text-sm font-bold uppercase tracking-[0.18em]">
            {isListening ? (
              <span className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 text-[#ff595e]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-[#ff595e] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 bg-[#ff595e]" />
                </span>
                Recording
              </span>
            ) : isTranscribing ? (
              <span className="inline-flex items-center gap-2 bg-sky-50 px-4 py-2 text-[#1982c4]">
                <span className="h-2 w-2 animate-pulse bg-[#1982c4]" />
                Transcribing
              </span>
            ) : (
              <span className="bg-[#efefef] px-4 py-2 text-slate-600">Ready</span>
            )}
          </div>
        </div>

        {!isSupported && (
          <div className="flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm font-bold text-[#ff595e]">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              Your browser doesn&apos;t support speech recognition. Try Chrome,
              Edge, or Safari for the best experience.
            </p>
          </div>
        )}

        {error && isSupported && (
          <div className="flex items-start gap-3 border border-yellow-200 bg-yellow-50 p-4 text-sm font-bold text-slate-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="border-2 border-transparent bg-[#efefef] transition-colors duration-200 focus-within:border-[#1982c4]">
          <div className="relative flex min-h-[360px] flex-col overflow-y-auto">
            <div
              ref={editorRef}
              contentEditable
              onInput={(event) => setTranscript(event.currentTarget.innerHTML)}
              onBlur={() => record(transcript)}
              style={{ fontSize: `${fontSize}px` }}
              className="min-h-[240px] flex-1 p-8 leading-relaxed text-slate-900 outline-none empty:before:block empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)]"
              spellCheck={false}
              data-placeholder="Click the microphone and start speaking..."
            />

            {interimTranscript && (
              <div
                style={{ fontSize: `${fontSize}px` }}
                className="px-8 pb-8 text-slate-500 italic"
              >
                {interimTranscript}
              </div>
            )}
            <div ref={endOfTextRef} />
          </div>

          <AnimatePresence>
            {showFindReplace && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-wrap items-center gap-3 overflow-hidden border-t-2 border-slate-200 bg-white px-4 py-3"
              >
                <div className="flex min-w-[200px] flex-1 items-center gap-2">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Find..."
                    value={findText}
                    onChange={(event) => setFindText(event.target.value)}
                    className="flex-1 bg-[#efefef] px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-500 focus:ring-2 focus:ring-[#1982c4]/40"
                  />
                </div>
                <div className="flex min-w-[200px] flex-1 items-center gap-2">
                  <input
                    type="text"
                    placeholder="Replace with..."
                    value={replaceText}
                    onChange={(event) => setReplaceText(event.target.value)}
                    className="flex-1 bg-[#efefef] px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-500 focus:ring-2 focus:ring-[#1982c4]/40"
                  />
                </div>
                <button
                  onClick={handleReplaceAll}
                  disabled={!findText}
                  className="bg-[#1982c4] px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#156ea6] disabled:opacity-50"
                >
                  Replace All
                </button>
                <button
                  onClick={() => setShowFindReplace(false)}
                  className="p-2 text-slate-400 transition-colors hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 border-r-2 border-slate-200 pr-4">
                <button
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className="p-2 text-slate-600 transition-colors hover:bg-[#efefef] hover:text-[#1982c4] disabled:opacity-30"
                  title="Undo"
                >
                  <Undo className="h-5 w-5" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={!canRedo}
                  className="p-2 text-slate-600 transition-colors hover:bg-[#efefef] hover:text-[#1982c4] disabled:opacity-30"
                  title="Redo"
                >
                  <Redo className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowFindReplace((current) => !current)}
                  className={`p-2 transition-colors ${
                    showFindReplace
                      ? "bg-[#1982c4] text-white"
                      : "text-slate-600 hover:bg-[#efefef] hover:text-[#1982c4]"
                  }`}
                  title="Find and Replace"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-1 border-r-2 border-slate-200 pr-4">
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    applyFormat("bold");
                  }}
                  className="p-2 text-slate-600 transition-colors hover:bg-[#efefef] hover:text-[#1982c4]"
                  title="Bold"
                >
                  <Bold className="h-5 w-5" />
                </button>
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    applyFormat("italic");
                  }}
                  className="p-2 text-slate-600 transition-colors hover:bg-[#efefef] hover:text-[#1982c4]"
                  title="Italic"
                >
                  <Italic className="h-5 w-5" />
                </button>
                <button
                  onMouseDown={(event) => {
                    event.preventDefault();
                    applyFormat("underline");
                  }}
                  className="p-2 text-slate-600 transition-colors hover:bg-[#efefef] hover:text-[#1982c4]"
                  title="Underline"
                >
                  <Underline className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-1 border-r-2 border-slate-200 pr-4">
                <button
                  onClick={decreaseFontSize}
                  className="p-2 text-slate-600 transition-colors hover:bg-[#efefef] hover:text-[#1982c4]"
                  title="Decrease Font Size"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-10 text-center text-sm font-black text-slate-700">
                  {fontSize}px
                </span>
                <button
                  onClick={increaseFontSize}
                  className="p-2 text-slate-600 transition-colors hover:bg-[#efefef] hover:text-[#1982c4]"
                  title="Increase Font Size"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {isTTSSupported && (
                <div className="flex items-center gap-3 border-r-2 border-slate-200 pr-4">
                  <button
                    onClick={() => toggleSpeaking(transcript)}
                    disabled={!transcript && !interimTranscript}
                    className={`p-2 transition-colors disabled:opacity-30 ${
                      isSpeaking
                        ? "bg-red-50 text-[#ff595e] hover:bg-red-100"
                        : "text-slate-600 hover:bg-[#efefef] hover:text-[#1982c4]"
                    }`}
                    title={isSpeaking ? "Stop Reading" : "Read Aloud"}
                  >
                    {isSpeaking ? (
                      <Square className="h-5 w-5 fill-current" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                      Speed
                    </span>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={rate}
                      onChange={(event) => setRate(parseFloat(event.target.value))}
                      className="w-20 accent-[#1982c4]"
                      title={`Playback Speed: ${rate}x`}
                    />
                    <span className="w-8 text-xs font-black text-slate-700">
                      {rate.toFixed(1)}x
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleReset}
                disabled={!transcript && !interimTranscript}
                className="p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-[#ff595e] disabled:opacity-50"
                title="Clear text"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={handleCopy}
              disabled={!transcript}
              className="inline-flex items-center gap-2 bg-[#ffca3a] px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-900 transition-colors hover:bg-[#e6b634] disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            disabled={!isSupported || isTranscribing}
            className={`relative flex h-24 w-24 items-center justify-center border-4 border-slate-900/10 text-white shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              isListening
                ? "bg-[#ff595e] hover:bg-[#e0484d]"
                : "bg-[#1982c4] hover:bg-[#156ea6]"
            }`}
            title={isListening ? "Stop dictation" : "Start dictation"}
          >
            {isListening && (
              <span className="absolute inset-0 animate-ping bg-[#ff595e] opacity-20" />
            )}
            {isListening ? (
              <MicOff className="h-10 w-10" />
            ) : (
              <Mic className="h-10 w-10" />
            )}
          </motion.button>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            {isListening
              ? "Tap to stop recording"
              : isTranscribing
                ? "Processing recording..."
                : "Tap to start dictation"}
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}
