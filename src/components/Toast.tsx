import React, { useEffect } from "react";
import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = window.setTimeout(onClose, 2000);
    return () => window.clearTimeout(timer);
  }, [isVisible, onClose]);

  useEffect(() => {
    if (!isVisible) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        bg-slate-900 text-white
        px-6 py-3
        border-2 border-slate-900
        shadow-xl
        flex items-center gap-2
        z-50
        transition
        animate-in fade-in slide-in-from-bottom-2 duration-200
      "
    >
      <Check size={16} className="text-secondary" />
      <span className="text-sm font-bold tracking-wide">{message}</span>
    </div>
  );
};
