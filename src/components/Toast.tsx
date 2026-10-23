import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#14182e] border border-purple-500/50 text-white text-xs font-semibold shadow-2xl shadow-purple-900/40">
        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse flex-shrink-0" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-0.5 ml-1 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
