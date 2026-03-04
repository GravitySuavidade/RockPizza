import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-rock-surface border border-rock-green/30 shadow-[0_4px_20px_rgba(166,255,0,0.15)] rounded-full px-4 py-3 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-rock-green" />
        <span className="font-sans text-sm font-medium text-rock-text whitespace-nowrap">{message}</span>
        <button onClick={onClose} className="text-rock-muted hover:text-white transition-colors ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
